/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * GOOGLE APPS SCRIPT BACKEND WEB APP (Code.gs)
 *
 * This code should be copy-pasted into your Google Apps Script Editor.
 * Deploy it as a Web App:
 *   - Execute as: Me (your account)
 *   - Who has access: Anyone
 *
 * Make sure you create a spreadsheet with the following sheets:
 *   1. "Settings" (Headers: Key, Value)
 *   2. "Notices" (Headers: Title, Content, SubContent)
 *   3. "KailashChandra" (Headers: Book, Volume, Grade, DictationNumber, WordCount, Transcript, Status, Notes)
 *   4. "ProgressiveMagazine" (Headers: Book, Month, Grade, DictationNumber, WordCount, Transcript, Status, Notes)
 *   5. "Unseen" (Headers: Title, AudioURL, DurationSeconds, Transcript, WordCount, Status)
 *   6. "Logs" (Headers: Timestamp, Type, Message, Details)
 */

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Active spreadsheet not found. Ensure script is bound to your Google Sheet."
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }

  // Handle manual cache purging if requested
  if (e.parameter.purge === "true" || e.parameter.purgeCache === "true") {
    try {
      const cache = CacheService.getScriptCache();
      cache.remove("steno_settings");
      cache.remove("steno_notices");
      logSystemMessage(sheet, "CACHE_PURGE", "Cache cleared by manual request", "Purged Settings and Notices");
      return createJsonResponse({ success: true, message: "Cache successfully purged." });
    } catch (purgeErr) {
      return createJsonResponse({ success: false, error: "Failed to purge cache: " + purgeErr.toString() });
    }
  }

  const action = e.parameter.action;
  if (!action) {
    logSystemMessage(sheet, "WARNING", "Request received with missing action", "URL Query: " + JSON.stringify(e.parameter));
    return createJsonResponse({ success: false, error: "Missing 'action' request parameter." });
  }

  try {
    if (action === "getSettings") {
      const settings = getSettingsMap(sheet);
      return createJsonResponse({ success: true, settings: settings });
    }

    if (action === "getNotice") {
      const notice = getActiveNotice(sheet);
      return createJsonResponse({ success: true, notice: notice });
    }

    if (action === "getTranscript") {
      const book = e.parameter.book; // 'kailash-chandra' or 'progressive-magazine'
      const volumeOrMonth = e.parameter.volumeOrMonth;
      const grade = e.parameter.grade;
      const dictationNumberStr = e.parameter.dictationNumber;
      const dictationNumber = parseInt(dictationNumberStr, 10);

      // Validate inputs
      const validationError = validateTranscriptParams(book, volumeOrMonth, grade, dictationNumber);
      if (validationError) {
        logSystemMessage(sheet, "VALIDATION_FAILED", "Transcript parameter validation failed", "Params: " + JSON.stringify(e.parameter) + " | Error: " + validationError);
        return createJsonResponse({ success: false, error: validationError });
      }

      const dictation = findTranscript(sheet, book, volumeOrMonth, grade, dictationNumber);
      if (dictation) {
        return createJsonResponse({ success: true, dictation: dictation });
      } else {
        logSystemMessage(sheet, "NOT_FOUND", "Transcript not found in database", "Book: " + book + ", Vol/Month: " + volumeOrMonth + ", Grade: " + grade + ", No: " + dictationNumberStr);
        return createJsonResponse({ success: false, error: "Transcription not found in database." });
      }
    }

    logSystemMessage(sheet, "WARNING", "Unknown action requested", "Action: " + action);
    return createJsonResponse({ success: false, error: "Invalid action request parameter." });

  } catch (err) {
    logSystemMessage(sheet, "EXCEPTION", "Exception in action: " + action, err.toString());
    return createJsonResponse({ success: false, error: "Internal server error: " + err.toString() });
  }
}

/**
 * Handle POST request for SSC evaluation requests and logs.
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!sheet) {
    return createJsonResponse({
      success: false,
      error: "Active spreadsheet not found."
    });
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    
    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        success: false,
        error: "Invalid JSON format in request body: " + parseErr.toString()
      });
    }

    const action = payload.action || "submitEvaluation";

    if (action === "submitEvaluation") {
      const candidate = payload.candidateName || "Anonymous";
      const book = payload.book || "Unknown Book";
      const volumeOrMonth = payload.volumeOrMonth || "Unknown Vol/Month";
      const grade = payload.grade || "Unknown Grade";
      const num = payload.dictationNumber || "N/A";
      const accuracy = payload.accuracy !== undefined ? payload.accuracy : "N/A";
      const mistakes = payload.totalMistakes !== undefined ? payload.totalMistakes : "N/A";
      const speed = payload.speedWpm || "N/A";
      
      const detailStr = "Candidate: " + candidate + 
                        " | Book: " + book + 
                        " | Vol: " + volumeOrMonth + 
                        " | Grade: " + grade + 
                        " | No: " + num + 
                        " | Accuracy: " + accuracy + "%" +
                        " | Mistakes: " + mistakes +
                        " | Speed: " + speed + " WPM";

      logSystemMessage(sheet, "EVALUATION_SUBMISSION", "SSC evaluation request processed", detailStr);

      return createJsonResponse({
        success: true,
        message: "SSC Evaluation logged successfully.",
        details: detailStr
      });
    }

    logSystemMessage(sheet, "POST_WARNING", "Unknown POST action requested: " + action, JSON.stringify(payload));
    return createJsonResponse({
      success: false,
      error: "Unknown action parameter in POST payload."
    });

  } catch (err) {
    logSystemMessage(sheet, "POST_ERROR", "POST endpoint exception occurred", err.toString());
    return createJsonResponse({
      success: false,
      error: "Internal server error: " + err.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

// Helper to create JSON output with safe stringifying and proper MIME type
function createJsonResponse(data) {
  const JSONString = JSON.stringify(data);
  return ContentService.createTextOutput(JSONString)
    .setMimeType(ContentService.MimeType.JSON);
}

// Map settings sheet values into key value pairs
function getSettingsMap(sheet) {
  const cacheKey = "steno_settings";
  const cached = getCachedData(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    const settingsSheet = sheet.getSheetByName("Settings");
    if (!settingsSheet) return {};

    const data = settingsSheet.getDataRange().getValues();
    const settings = {};
    for (let i = 1; i < data.length; i++) {
      const key = data[i][0];
      const val = data[i][1];
      if (key) {
        settings[key] = val;
      }
    }
    
    setCachedData(cacheKey, JSON.stringify(settings), 1800); // cache for 30 minutes
    return settings;
  } finally {
    lock.releaseLock();
  }
}

// Get top active notice banner
function getActiveNotice(sheet) {
  const cacheKey = "steno_notices";
  const cached = getCachedData(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    const noticeSheet = sheet.getSheetByName("Notices");
    if (!noticeSheet) return null;

    const data = noticeSheet.getDataRange().getValues();
    if (data.length > 1) {
      const latest = data[data.length - 1];
      const notice = {
        title: latest[0],
        content: latest[1],
        subContent: latest[2] || ""
      };
      setCachedData(cacheKey, JSON.stringify(notice), 1800); // cache for 30 minutes
      return notice;
    }
    return null;
  } finally {
    lock.releaseLock();
  }
}

// Find specific transcript based on filters
function findTranscript(sheet, book, volumeOrMonth, grade, dictationNumber) {
  // Construct clean cache key to speed up future requests
  const cleanBook = String(book).toLowerCase().replace(/\s+/g, "_");
  const cleanVol = String(volumeOrMonth).toLowerCase().replace(/\s+/g, "_");
  const cleanGrade = String(grade).toLowerCase();
  const cacheKey = "steno_transcript_" + cleanBook + "_" + cleanVol + "_" + cleanGrade + "_" + dictationNumber;
                 
  const cached = getCachedData(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    
    const sheetName = book === "kailash-chandra" ? "KailashChandra" : "ProgressiveMagazine";
    const dataSheet = sheet.getSheetByName(sheetName);
    if (!dataSheet) return null;

    const data = dataSheet.getDataRange().getValues();
    // Headers:
    // For KailashChandra: Book, Volume, Grade, DictationNumber, WordCount, Transcript, Status, Notes
    // For ProgressiveMagazine: Book, Month, Grade, DictationNumber, WordCount, Transcript, Status, Notes

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rBook = String(row[0]).trim().toLowerCase();
      const rVolOrMonth = String(row[1]).trim();
      const rGrade = String(row[2]).trim().toUpperCase();
      const rNum = parseInt(row[3], 10);
      const rStatus = String(row[6]).trim().toLowerCase();

      if (
        rBook === book.toLowerCase() &&
        rVolOrMonth.toLowerCase() === volumeOrMonth.toLowerCase() &&
        rGrade === grade.toUpperCase() &&
        rNum === dictationNumber &&
        rStatus !== "inactive"
      ) {
        const dictation = {
          book: book,
          volumeOrMonth: rVolOrMonth,
          grade: rGrade,
          dictationNumber: rNum,
          wordCount: parseInt(row[4], 10) || 0,
          transcript: String(row[5]),
          status: row[6],
          notes: row[7] || ""
        };
        
        setCachedData(cacheKey, JSON.stringify(dictation), 3600); // Cache transcripts for 60 minutes
        return dictation;
      }
    }
    return null;
  } finally {
    lock.releaseLock();
  }
}

// Validate transcription inputs
function validateTranscriptParams(book, volumeOrMonth, grade, dictationNumber) {
  if (!book) {
    return "Missing 'book' parameter.";
  }
  const bookLower = book.toLowerCase();
  if (bookLower !== "kailash-chandra" && bookLower !== "progressive-magazine") {
    return "Invalid 'book' parameter. Must be 'kailash-chandra' or 'progressive-magazine'.";
  }
  if (!volumeOrMonth || volumeOrMonth.trim() === "") {
    return "Missing 'volumeOrMonth' parameter.";
  }
  if (!grade) {
    return "Missing 'grade' parameter.";
  }
  const gradeUpper = grade.toUpperCase();
  if (gradeUpper !== "C" && gradeUpper !== "D") {
    return "Invalid 'grade' parameter. Must be 'C' or 'D'.";
  }
  if (isNaN(dictationNumber) || dictationNumber <= 0) {
    return "Invalid 'dictationNumber' parameter. Must be a positive integer.";
  }
  return null;
}

// Fetch cached item safely
function getCachedData(key) {
  try {
    const cache = CacheService.getScriptCache();
    return cache.get(key);
  } catch (e) {
    console.warn("Cache read failed: " + e.toString());
    return null;
  }
}

// Store cached item safely with limits guard
function setCachedData(key, value, durationSec) {
  try {
    const cache = CacheService.getScriptCache();
    // CacheService limit is 100KB (102,400 bytes).
    if (value.length < 100000) {
      cache.put(key, value, durationSec || 1800);
    } else {
      console.warn("Skipping caching because payload is close to 100KB limit");
    }
  } catch (e) {
    console.warn("Cache write failed: " + e.toString());
  }
}

// Log action details safely to the "Logs" sheet
function logSystemMessage(sheet, type, message, details) {
  try {
    const lock = LockService.getScriptLock();
    let hasLock = false;
    try {
      hasLock = lock.tryLock(1000);
    } catch(lockErr) {
      // Ignore lock errors, proceed to write
    }
    
    let logsSheet = sheet.getSheetByName("Logs");
    if (!logsSheet) {
      logsSheet = sheet.insertSheet("Logs");
      logsSheet.appendRow(["Timestamp", "Type", "Message", "Details"]);
    }
    logsSheet.appendRow([new Date(), type, message, details || ""]);
    
    if (hasLock) {
      lock.releaseLock();
    }
  } catch (e) {
    console.error("Failed to write to Logs: " + e.toString());
  }
}

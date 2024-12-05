"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var blob_1 = require("@vercel/blob");
var promises_1 = require("fs/promises");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var crypto_1 = require("crypto");
var ignore_1 = require("ignore");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var chalk_1 = require("chalk");
var ora_1 = require("ora");
// Load environment variables
dotenv_1.default.config({ path: '.env.local' });
var PUBLIC_DIR = path_1.default.join(process.cwd(), 'public');
var ASSETS_FILE = path_1.default.join(process.cwd(), 'config', 'assets.ts');
// Initialize ignore instance
var ig;
function initializeGitignore() {
    return __awaiter(this, void 0, void 0, function () {
        var gitignoreContent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ig = (0, ignore_1.default)();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_1.promises.readFile(path_1.default.join(process.cwd(), '.gitignore'), 'utf8')];
                case 2:
                    gitignoreContent = _a.sent();
                    ig.add(gitignoreContent);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.warn('No .gitignore file found, proceeding without ignore rules');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Helper to calculate file hash
function calculateFileHash(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileBuffer, hashSum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promises_1.default.readFile(filePath)];
                case 1:
                    fileBuffer = _a.sent();
                    hashSum = crypto_1.default.createHash('sha256');
                    hashSum.update(fileBuffer);
                    return [2 /*return*/, hashSum.digest('hex')];
            }
        });
    });
}
function organizeByDirectory(blobs) {
    var structure = {};
    // Filter out .DS_Store files before processing
    var filteredBlobs = blobs.filter(function (blob) { return !blob.pathname.includes('.DS_Store'); });
    filteredBlobs.forEach(function (_a) {
        var pathname = _a.pathname, url = _a.url;
        var parts = pathname.split('/');
        var current = structure;
        parts.forEach(function (part, index) {
            // Get the name without extension for the final part
            var key = index === parts.length - 1 ? part.replace(/\.[^/.]+$/, '') : part;
            if (index === parts.length - 1) {
                // If there's already an entry, convert to array
                if (current[key]) {
                    if (Array.isArray(current[key])) {
                        current[key].push(url);
                    }
                    else {
                        current[key] = [current[key], url];
                    }
                }
                else {
                    current[key] = url;
                }
            }
            else {
                current[key] = current[key] || {};
                current = current[key];
            }
        });
    });
    // Sort any arrays in the structure
    var sortArrays = function (obj) {
        for (var key in obj) {
            if (Array.isArray(obj[key])) {
                obj[key].sort();
            }
            else if (typeof obj[key] === 'object') {
                sortArrays(obj[key]);
            }
        }
    };
    sortArrays(structure);
    return structure;
}
function generateTypeScriptCode(structure) {
    return "export const assets = ".concat(JSON.stringify(structure, null, 2), " as const;\n\nexport type AssetUrl = string;\n");
}
// Get all local files recursively
function getAllLocalFiles(dir_1) {
    return __awaiter(this, arguments, void 0, function (dir, baseDir) {
        var entries, files, _i, entries_1, entry, fullPath, relativePath, relativeToRoot, _a, _b, _c;
        if (baseDir === void 0) { baseDir = ''; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, promises_1.default.readdir(dir, { withFileTypes: true })];
                case 1:
                    entries = _d.sent();
                    files = [];
                    _i = 0, entries_1 = entries;
                    _d.label = 2;
                case 2:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 6];
                    entry = entries_1[_i];
                    if (entry.name.includes('.DS_Store'))
                        return [3 /*break*/, 5];
                    fullPath = path_1.default.join(dir, entry.name);
                    relativePath = path_1.default.join(baseDir, entry.name);
                    relativeToRoot = path_1.default.relative(process.cwd(), fullPath);
                    if (ig.ignores(relativeToRoot)) {
                        console.log("Skipping ignored path: ".concat(relativeToRoot));
                        return [3 /*break*/, 5];
                    }
                    if (!entry.isDirectory()) return [3 /*break*/, 4];
                    _b = (_a = files.push).apply;
                    _c = [files];
                    return [4 /*yield*/, getAllLocalFiles(fullPath, relativePath)];
                case 3:
                    _b.apply(_a, _c.concat([(_d.sent())]));
                    return [3 /*break*/, 5];
                case 4:
                    files.push(relativePath);
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/, files];
            }
        });
    });
}
// Add this helper function to check git status
function isFileModifiedInGit(relativePath) {
    return __awaiter(this, void 0, void 0, function () {
        var isTracked, status_1;
        return __generator(this, function (_a) {
            try {
                isTracked = (0, child_process_1.execSync)("git ls-files ".concat(relativePath), {
                    encoding: 'utf8',
                    stdio: ['pipe', 'pipe', 'ignore'],
                }).length > 0;
                if (!isTracked) {
                    return [2 /*return*/, true]; // New file, needs upload
                }
                status_1 = (0, child_process_1.execSync)("git status --porcelain ".concat(relativePath), {
                    encoding: 'utf8',
                    stdio: ['pipe', 'pipe', 'ignore'],
                });
                return [2 /*return*/, status_1.length > 0]; // Returns true if file is modified
            }
            catch (error) {
                logWarning("Unable to check git status for ".concat(chalk_1.default.bold(relativePath)));
                return [2 /*return*/, true];
            }
            return [2 /*return*/];
        });
    });
}
// Add these helper functions at the top level
function logSuccess(message) {
    console.log(chalk_1.default.green('✓'), message);
}
function logInfo(message) {
    console.log(chalk_1.default.blue('ℹ'), message);
}
function logWarning(message) {
    console.log(chalk_1.default.yellow('⚠'), message);
}
function logError(message) {
    console.log(chalk_1.default.red('✖'), message);
}
// Update the processFiles function with better logging
function processFiles(localFiles, existingBlobs) {
    return __awaiter(this, void 0, void 0, function () {
        var processedFiles, spinner, _i, localFiles_1, relativePath, fullPath, isModified, file, file, deletions, _a, deletions_1, remotePath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    processedFiles = new Set();
                    spinner = (0, ora_1.default)();
                    console.log(chalk_1.default.bold('\n🚀 Processing files...\n'));
                    _i = 0, localFiles_1 = localFiles;
                    _b.label = 1;
                case 1:
                    if (!(_i < localFiles_1.length)) return [3 /*break*/, 12];
                    relativePath = localFiles_1[_i];
                    spinner.start(chalk_1.default.dim("Checking ".concat(relativePath)));
                    fullPath = path_1.default.join(PUBLIC_DIR, relativePath);
                    if (!existingBlobs.has(relativePath)) return [3 /*break*/, 7];
                    return [4 /*yield*/, isFileModifiedInGit(path_1.default.join('public', relativePath))];
                case 2:
                    isModified = _b.sent();
                    if (!isModified) return [3 /*break*/, 5];
                    spinner.text = chalk_1.default.dim("Uploading ".concat(relativePath));
                    return [4 /*yield*/, promises_1.default.readFile(fullPath)];
                case 3:
                    file = _b.sent();
                    return [4 /*yield*/, (0, blob_1.put)(relativePath, file, {
                            access: 'public',
                            addRandomSuffix: false,
                        })];
                case 4:
                    _b.sent();
                    spinner.stop();
                    logSuccess("Updated ".concat(chalk_1.default.bold(relativePath)));
                    return [3 /*break*/, 6];
                case 5:
                    spinner.stop();
                    logInfo("Skipped ".concat(chalk_1.default.bold(relativePath), " (unchanged)"));
                    _b.label = 6;
                case 6: return [3 /*break*/, 10];
                case 7:
                    spinner.text = chalk_1.default.dim("Uploading ".concat(relativePath));
                    return [4 /*yield*/, promises_1.default.readFile(fullPath)];
                case 8:
                    file = _b.sent();
                    return [4 /*yield*/, (0, blob_1.put)(relativePath, file, {
                            access: 'public',
                            addRandomSuffix: false,
                        })];
                case 9:
                    _b.sent();
                    spinner.stop();
                    logSuccess("Uploaded ".concat(chalk_1.default.bold(relativePath), " (new)"));
                    _b.label = 10;
                case 10:
                    processedFiles.add(relativePath);
                    _b.label = 11;
                case 11:
                    _i++;
                    return [3 /*break*/, 1];
                case 12:
                    deletions = Array.from(existingBlobs.entries()).filter(function (_a) {
                        var remotePath = _a[0];
                        return !processedFiles.has(remotePath);
                    });
                    if (!(deletions.length > 0)) return [3 /*break*/, 16];
                    console.log(chalk_1.default.bold('\n🧹 Cleaning up removed files...\n'));
                    _a = 0, deletions_1 = deletions;
                    _b.label = 13;
                case 13:
                    if (!(_a < deletions_1.length)) return [3 /*break*/, 16];
                    remotePath = deletions_1[_a][0];
                    spinner.start(chalk_1.default.dim("Removing ".concat(remotePath)));
                    return [4 /*yield*/, (0, blob_1.del)(existingBlobs.get(remotePath))];
                case 14:
                    _b.sent();
                    spinner.stop();
                    logSuccess("Removed ".concat(chalk_1.default.bold(remotePath)));
                    _b.label = 15;
                case 15:
                    _a++;
                    return [3 /*break*/, 13];
                case 16: return [2 /*return*/];
            }
        });
    });
}
// Update uploadAssets function with better logging
function uploadAssets() {
    return __awaiter(this, void 0, void 0, function () {
        var mainSpinner, existingBlobs, existingUrlMap, localFiles, finalBlobs, assetStructure, tsCode, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mainSpinner = (0, ora_1.default)();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    console.log(chalk_1.default.bold('\n📦 Starting asset upload process...\n'));
                    mainSpinner.start('Initializing gitignore rules');
                    return [4 /*yield*/, initializeGitignore()];
                case 2:
                    _a.sent();
                    mainSpinner.succeed('Gitignore rules loaded');
                    mainSpinner.start('Fetching existing assets');
                    return [4 /*yield*/, (0, blob_1.list)()];
                case 3:
                    existingBlobs = _a.sent();
                    existingUrlMap = new Map(existingBlobs.blobs
                        .filter(function (blob) { return !blob.pathname.includes('.DS_Store'); })
                        .map(function (blob) { return [blob.pathname, blob.url]; }));
                    mainSpinner.succeed("Found ".concat(existingBlobs.blobs.length, " existing assets"));
                    mainSpinner.start('Scanning local files');
                    return [4 /*yield*/, getAllLocalFiles(PUBLIC_DIR)];
                case 4:
                    localFiles = _a.sent();
                    mainSpinner.succeed("Found ".concat(localFiles.length, " local files"));
                    return [4 /*yield*/, processFiles(localFiles, existingUrlMap)];
                case 5:
                    _a.sent();
                    mainSpinner.start('Generating assets.ts');
                    return [4 /*yield*/, (0, blob_1.list)()];
                case 6:
                    finalBlobs = _a.sent();
                    assetStructure = organizeByDirectory(finalBlobs.blobs);
                    tsCode = generateTypeScriptCode(assetStructure);
                    return [4 /*yield*/, promises_1.default.writeFile(ASSETS_FILE, tsCode)];
                case 7:
                    _a.sent();
                    mainSpinner.succeed('Generated assets.ts');
                    console.log(chalk_1.default.bold.green('\n✨ Asset upload complete!\n'));
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _a.sent();
                    mainSpinner.fail('Error during asset upload');
                    logError(error_2 instanceof Error ? error_2.message : 'Unknown error occurred');
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Run the upload
uploadAssets();

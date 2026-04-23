$ErrorActionPreference = "Stop"

$repoRoot = if ($env:CHATGPT_IMAGES_BROWSER_ROOT) {
    $env:CHATGPT_IMAGES_BROWSER_ROOT
} else {
    (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

$profileRoot = if ($env:CHATGPT_IMAGES_BROWSER_PROFILE_DIR) {
    $env:CHATGPT_IMAGES_BROWSER_PROFILE_DIR
} else {
    Join-Path $repoRoot ".local\\chatgpt-images-browser-v1"
}

$chromeProfileDir = Join-Path $profileRoot "chrome-profile"
$cdpPort = if ($env:CHATGPT_IMAGES_BROWSER_CDP_PORT) { [int]$env:CHATGPT_IMAGES_BROWSER_CDP_PORT } else { 9031 }
$openUrl = if ($env:CHATGPT_IMAGES_BROWSER_URL) { $env:CHATGPT_IMAGES_BROWSER_URL } else { "https://chatgpt.com/" }
$browserExe = if ($env:CHATGPT_IMAGES_BROWSER_CHROME) { $env:CHATGPT_IMAGES_BROWSER_CHROME } else { "" }

function Resolve-ChromePath {
    param([string]$Preferred)

    $candidates = @()
    if ($Preferred) {
        $candidates += $Preferred
    }

    $candidates += @(
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        (Join-Path $env:LocalAppData "Google\\Chrome\\Application\\chrome.exe")
    )

    foreach ($candidate in $candidates) {
        if ($candidate -and (Test-Path $candidate)) {
            return $candidate
        }
    }

    return ""
}

if (-not (Test-Path $profileRoot)) {
    New-Item -ItemType Directory -Path $profileRoot -Force | Out-Null
}

if (-not (Test-Path $chromeProfileDir)) {
    New-Item -ItemType Directory -Path $chromeProfileDir -Force | Out-Null
}

$browserExe = Resolve-ChromePath -Preferred $browserExe
if (-not $browserExe) {
    throw "Chrome executable not found."
}

$args = @(
    "--user-data-dir=$chromeProfileDir",
    "--remote-debugging-port=$cdpPort",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
    "--disable-features=CalculateNativeWinOcclusion",
    $openUrl
)

Write-Host "ChatGPT Images browser profile: $chromeProfileDir"
Write-Host "CDP port: $cdpPort"
Write-Host "Open URL: $openUrl"

Start-Process -FilePath $browserExe -ArgumentList $args | Out-Null

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root "src"
$manifests = Join-Path $root "manifests"
$dist = Join-Path $root "dist"

$targets = @("chrome", "firefox")

foreach ($target in $targets) {
  $outDir = Join-Path $dist $target
  if (Test-Path $outDir) {
    Remove-Item -Recurse -Force $outDir
  }
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null

  Copy-Item -Path (Join-Path $src "*") -Destination $outDir -Recurse -Force
  Copy-Item -Path (Join-Path $manifests "manifest.$target.json") -Destination (Join-Path $outDir "manifest.json") -Force
}

Write-Host "Built to dist/chrome and dist/firefox"
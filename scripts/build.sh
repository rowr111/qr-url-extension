#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
src="$root/src"
manifests="$root/manifests"
dist="$root/dist"

for target in chrome firefox; do
  out="$dist/$target"
  rm -rf "$out"
  mkdir -p "$out"
  cp -R "$src/." "$out/"
  cp "$manifests/manifest.$target.json" "$out/manifest.json"
done

echo "Built to dist/chrome and dist/firefox"
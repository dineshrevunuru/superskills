#!/usr/bin/env bash
# Human-in-the-loop reproduction loop (last resort — see diagnose-bugs SKILL.md).
# Use ONLY when a step is genuinely human-only: a real payment, a physical device,
# or a captcha (which the agent must never solve for the user).
# Prefer an unattended Playwright loop that prints a flake rate; drop to this only
# when a human must physically act.
#
# Copy this file, edit the steps below, run it. The agent runs the script; the
# user follows prompts in their terminal. Captured verdicts print as KEY=VALUE at
# the end for the agent to parse — never freeform "did it work?" chat.
#
# Usage:
#   bash hitl-loop.template.sh
#
# Two helpers:
#   step "<instruction>"      → show instruction, wait for Enter
#   capture VAR "<question>"  → show question, read response into VAR

set -euo pipefail

step() {
  printf '\n>>> %s\n' "$1"
  read -r -p "    [Enter when done] " _
}

capture() {
  local var="$1" question="$2" answer
  printf '\n>>> %s\n' "$question"
  read -r -p "    > " answer
  printf -v "$var" '%s' "$answer"
}

# --- edit below (example: a salon booking app, dev server on :3000) -------

step "Open the booking app at http://localhost:3000 and sign in."

step "Pick a time slot, then tap 'Confirm' twice in quick succession."

capture MISMATCH "Did the confirmation show a DIFFERENT time than you picked? (y/n)"

capture SHOWN_TIME "Paste the time the confirmation screen showed (or 'match'):"

# --- edit above -----------------------------------------------------------

printf '\n--- Captured ---\n'
printf 'MISMATCH=%s\n' "$MISMATCH"
printf 'SHOWN_TIME=%s\n' "$SHOWN_TIME"

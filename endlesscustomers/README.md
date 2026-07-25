# endlesscustomers.com — placeholder, intentionally empty

**No files here, and that's correct.** Two reasons:

1. The endlesscustomers.com redesign is built directly in **HubSpot content staging** by the web team (Melissa/Danny/Joe) and marketing (Nicole/Stephanie). The theme and modules live in HubSpot's Design Manager, not on disk, so there's nothing local to commit. Pulling them down would need the HubSpot CLI (`hs fetch`), which is a real project, not a file move.
2. **Bob already has EC website files elsewhere on his computer**, in a separate folder with its own GitHub setup (confirmed 2026-07-25). Those were deliberately left alone rather than dragged into this repo. Sorting out whether they should eventually consolidate here is a later decision, not settled.

Project tracking (strategy, decision log, page briefs, governance): [[../../../30-projects/websites/endlesscustomers/index|30-projects/websites/endlesscustomers]].

**If local EC build files ever do land here**, they follow the same rule as every other site in this repo: self-contained subfolder, its own `design-system/` copy if EC gets one exported, and nothing linking outside this folder.

No EC-specific design system has been exported yet. See [[../../../50-resources/impact/website-design-systems|website-design-systems registry]].

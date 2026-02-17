---
"nansen-cli": patch
---

fix: profiler pnl endpoint, token screener --search, help shows all subcommands

- `profiler pnl` now uses correct endpoint `/api/v1/profiler/address/pnl` (was using non-existent `/pnl-and-trade-performance`). Now supports `--date` and `--limit`.
- `token screener --search PEPE` now filters results by token symbol/name (client-side, API doesn't support server-side search)
- Help text updated to list all 33 subcommands (was showing only 16, hiding 17 commands)
- Schema updated with `search` option for screener and `date`/`days`/`limit` for profiler pnl

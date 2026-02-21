# Trade Journal — Agent Skill

You have access to a trade journal that logs every trade you make. Use it to learn from past performance and improve over time.

## Core Principle

**Positive PnL = good signal. Negative PnL = bad signal.**

After every trade cycle, review the journal to identify what worked and what didn't. Adjust your strategy accordingly.

## Commands

### Making Trades (auto-logged)

```bash
# Every swap is automatically logged to the journal
nansen trade swap --input-mint SOL --output-mint USDC --amount 100000000 --wallet-id <id>
```

### Reviewing Performance

```bash
# View performance summary — your main learning signal
nansen trade journal --summary

# View recent trades
nansen trade journal --limit 10

# View only open positions
nansen trade journal --status open

# View trades since a date
nansen trade journal --since 2026-02-01
```

### Closing Trades

```bash
# Close a trade and record the outcome
nansen trade close --id <trade_id> --exit-price 1.50 --reason "take-profit"
```

### Position Monitoring

```bash
# Set up automated monitoring
nansen trade monitor --action setup --every 6h --wallet <addr> --stop-loss -10 --take-profit 20

# Check positions now
nansen trade monitor --action check

# Export cron job config
nansen trade monitor --action cron-export
```

## Agent Learning Loop

Follow this loop every time you trade:

### 1. Before Trading — Check History
```bash
nansen trade journal --summary
```
Read the `signal` field. If NEGATIVE, review losing trades before making new ones.

### 2. Analyze Patterns
Look for:
- **Tokens that consistently lose** → avoid or reduce position size
- **Time-of-day patterns** → some entries work better at certain times
- **Position sizing** → are losses larger than wins? Adjust amounts
- **Hold duration** → are you closing too early or too late?

### 3. After Trading — Log Observations
The trade is auto-logged. When you close it, add a reason:
- `"take-profit"` — hit your target
- `"stop-loss"` — cut losses
- `"thesis-invalid"` — original reason no longer holds
- `"rebalance"` — portfolio adjustment

### 4. Periodic Review
Every few days, run `journal --summary` and look at:
- **Win rate** — above 50% is good, but profit factor matters more
- **Profit factor** — avg win / avg loss, aim for > 1.5
- **By-token breakdown** — which tokens are you best at trading?
- **Signal** — POSITIVE/NEGATIVE/NEUTRAL overall direction

## Journal Schema

Each trade entry contains:
```json
{
  "id": "trade_1708...",
  "timestamp": "2026-02-20T...",
  "status": "open|closed|failed",
  "inputMint": "So11...",
  "outputMint": "EPjF...",
  "inAmount": "100000000",
  "outAmount": "8500000",
  "entryUsdValue": "83.50",
  "walletAddress": "BQ72...",
  "signature": "5UfD...",
  "updates": [...],
  "pnl": { "usd": 5.20, "percent": 6.2, "result": "win" }
}
```

## Rules for the Agent

1. **Always check journal before trading** — don't repeat mistakes
2. **Never ignore a NEGATIVE signal** — reduce position sizes or pause trading
3. **Log closing reasons** — "manual" tells you nothing, be specific
4. **Respect stop-loss rules** — if monitoring says CLOSE, close
5. **Track by token** — develop expertise in specific tokens over time
6. **Journal is your memory** — between sessions, this is how you remember what worked

## Storage

Journal file: `~/.nansen/trade-journal.json`
Monitor config: `~/.nansen/monitor-config.json`

Both are local, gitignored, and private.

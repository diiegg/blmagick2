# PM2 Process Management for BlackMagickOps

## Setup Complete ✅

PM2 is now configured for persistent dev server management.

## Quick Start

### Development Server (Port 3001)
```bash
# Start dev server with PM2
pnpm pm2:dev

# Check status
pnpm pm2:status

# View logs
pnpm pm2:logs

# Restart server
pnpm pm2:restart

# Stop server
pnpm pm2:stop
```

### Production Server (Port 3000)
```bash
# Start production build
pnpm pm2:prod
```

## Benefits

✅ **Persistent Server**: Runs continuously in background  
✅ **Auto-Restart**: Automatically restarts on crashes  
✅ **Log Management**: Centralized logs in `logs/` directory  
✅ **Zero Downtime**: No manual startup needed  
✅ **Process Monitoring**: Real-time status with `pm2:status`

## Configuration

The `ecosystem.config.cjs` file defines two process modes:

### Development Mode (`blackmagickops-dev`)
- Runs on port **3001**
- Uses Turbopack for fast refresh
- Auto-restarts on crashes (max 10 restarts)
- Logs: `logs/pm2-out.log` and `logs/pm2-error.log`

### Production Mode (`blackmagickops-prod`)
- Runs on port **3000**
- Cluster mode for better performance
- Memory limit: 500MB auto-restart
- Logs: `logs/pm2-prod-out.log` and `logs/pm2-prod-error.log`

## Advanced Commands

```bash
# Stop all processes
pnpm exec pm2 stop all

# Delete all processes from PM2
pnpm pm2:delete

# Monitor processes in terminal
pnpm exec pm2 monit

# View detailed process info
pnpm exec pm2 describe blackmagickops-dev

# Save process list (startup on reboot)
pnpm exec pm2 save
pnpm exec pm2 startup
```

## Startup on Boot (Optional)

To make the dev server start automatically when your Mac boots:

```bash
# Save current PM2 process list
pnpm exec pm2 save

# Generate startup script
pnpm exec pm2 startup

# Follow the command PM2 outputs
```

## Logs Location

All logs are stored in the `logs/` directory:
- `pm2-out.log` - Standard output (dev mode)
- `pm2-error.log` - Error output (dev mode)
- `pm2-prod-out.log` - Production output
- `pm2-prod-error.log` - Production errors

## Troubleshooting

**Server won't start?**
```bash
pnpm pm2:delete  # Remove old processes
pnpm pm2:dev     # Start fresh
```

**Port conflict?**
```bash
lsof -ti:3001 | xargs kill -9  # Kill process on 3001
pnpm pm2:restart                # Restart PM2
```

**Check what's running:**
```bash
pnpm pm2:status
```

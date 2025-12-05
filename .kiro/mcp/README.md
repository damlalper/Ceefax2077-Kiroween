# MCP Integration Directory

Model Context Protocol integration for Ceefax 2077.

## Structure

```
.kiro/mcp/
├── workflows/           # MCP workflow definitions
│   ├── crypto-intelligence.yaml
│   ├── truth-pipeline.yaml
│   ├── filesystem-operations.yaml
│   ├── memory-chain.yaml
│   ├── iot-automation.yaml
│   ├── wayback-time-travel.yaml
│   └── browser-scraping.yaml
└── README.md           # This file
```

## Workflows

### crypto-intelligence.yaml
Cryptocurrency market analysis chain for Zone 200 (System).
- **Trigger**: User visits P200 (Stonks)
- **Agents**: crypto-intelligence, browser-automation
- **Output**: Real-time crypto prices, market trends, whale alerts

### truth-pipeline.yaml
News verification and bias detection for Zone 100 (Truth).
- **Trigger**: User visits P100 (GlobalWire)
- **Agents**: browser-automation, memory-vault
- **Output**: Verified news with credibility scores

### filesystem-operations.yaml
Extended file system operations for P907 (LocalGhost).
- **Trigger**: User action on LocalGhost
- **Agents**: filesystem-extended, browser-automation
- **Output**: File listings, metadata, content in Teletext format

### memory-chain.yaml
Persistent memory storage for P103 (MemoryVault).
- **Trigger**: User action on MemoryVault
- **Agents**: memory-vault, browser-automation
- **Output**: Stored memories with search and analysis

### iot-automation.yaml
Smart home device control for P800 (TeleHome).
- **Trigger**: User action on TeleHome
- **Agents**: iot-control
- **Output**: Device status and control commands

### wayback-time-travel.yaml
Historical web snapshots for P801 (TimeMachine).
- **Trigger**: User action on TimeMachine
- **Agents**: wayback-machine, browser-automation
- **Output**: Historical web pages in Teletext format

### browser-scraping.yaml
Web scraping for news and content aggregation.
- **Trigger**: Scheduled (hourly)
- **Agents**: browser-automation, memory-vault
- **Output**: Scraped content with sentiment analysis

## MCP Agents

All agents are implemented in `ceefax-2077/src/mcp/`:

1. **WaybackAgent.ts** - Internet Archive integration
2. **IoTAgent.ts** - Smart home device control
3. **CryptoAgent.ts** - Cryptocurrency market data
4. **MemoryAgent.ts** - Persistent memory storage
5. **BrowserAgent.ts** - Web scraping and automation
6. **FileSystemAgent.ts** - Extended file operations
7. **ChainExecutor.ts** - Workflow orchestration

## Configuration

MCP servers are configured in `.kiro/settings/mcp.json`.

Each agent can be enabled/disabled and has auto-approve settings for specific tools.

## Usage

Workflows are automatically triggered by:
- User actions on specific pages
- Scheduled intervals
- System events (hooks)

The ChainExecutor orchestrates multi-step workflows with error handling, caching, and retry logic.

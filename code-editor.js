/**
 * Code Editor Module
 * Extensible syntax highlighting and code execution for textarea.my
 */

// Language configurations - extensible for future languages
const languages = {
  javascript: {
    name: 'JavaScript',
    aliases: ['js', 'javascript'],
    runnable: true,
    keywords: new Set([
      'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
      'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
      'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'of',
      'return', 'static', 'super', 'switch', 'this', 'throw', 'try', 'typeof',
      'var', 'void', 'while', 'with', 'yield', 'true', 'false', 'null', 'undefined'
    ]),
    builtins: new Set([
      'console', 'window', 'document', 'Array', 'Object', 'String', 'Number',
      'Boolean', 'Function', 'Symbol', 'Map', 'Set', 'WeakMap', 'WeakSet',
      'Promise', 'Proxy', 'Reflect', 'JSON', 'Math', 'Date', 'RegExp', 'Error',
      'TypeError', 'SyntaxError', 'ReferenceError', 'parseInt', 'parseFloat',
      'isNaN', 'isFinite', 'encodeURI', 'decodeURI', 'setTimeout', 'setInterval',
      'clearTimeout', 'clearInterval', 'fetch', 'URL', 'URLSearchParams',
      'TextEncoder', 'TextDecoder', 'Blob', 'File', 'FileReader', 'FormData',
      'XMLHttpRequest', 'WebSocket', 'localStorage', 'sessionStorage',
      'Uint8Array', 'Int8Array', 'Uint16Array', 'Int16Array', 'Uint32Array',
      'Int32Array', 'Float32Array', 'Float64Array', 'ArrayBuffer', 'DataView'
    ]),
    tokenPatterns: [
      { type: 'comment', re: /\/\/[^\n]*/y },
      { type: 'comment', re: /\/\*[\s\S]*?\*\//y },
      { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
      { type: 'string', re: /'(?:[^'\\]|\\.)*'/y },
      { type: 'string', re: /`(?:[^`\\]|\\.)*`/y },
      { type: 'regex', re: /\/(?![*/])(?:[^\\/\n]|\\.)+\/[gimsuy]*/y },
      { type: 'number', re: /\b(?:0x[\da-fA-F]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/y },
      { type: 'operator', re: /[+\-*/%=<>!&|^~?:]+|\.{3}/y },
      { type: 'word', re: /[a-zA-Z_$][\w$]*/y },
      { type: 'punctuation', re: /[{}()\[\];,.]/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  },
  typescript: {
    name: 'TypeScript',
    aliases: ['ts', 'typescript'],
    runnable: true, // Runs as JS (without type checking)
    keywords: new Set([
      'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
      'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
      'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'of',
      'return', 'static', 'super', 'switch', 'this', 'throw', 'try', 'typeof',
      'var', 'void', 'while', 'with', 'yield', 'true', 'false', 'null', 'undefined',
      // TypeScript specific
      'type', 'interface', 'enum', 'namespace', 'module', 'declare', 'abstract',
      'implements', 'private', 'protected', 'public', 'readonly', 'as', 'is',
      'keyof', 'infer', 'never', 'unknown', 'any'
    ]),
    builtins: new Set([
      'console', 'window', 'document', 'Array', 'Object', 'String', 'Number',
      'Boolean', 'Function', 'Symbol', 'Map', 'Set', 'WeakMap', 'WeakSet',
      'Promise', 'Proxy', 'Reflect', 'JSON', 'Math', 'Date', 'RegExp', 'Error',
      'TypeError', 'SyntaxError', 'ReferenceError', 'parseInt', 'parseFloat',
      'isNaN', 'isFinite', 'encodeURI', 'decodeURI', 'setTimeout', 'setInterval',
      'clearTimeout', 'clearInterval', 'fetch', 'URL', 'URLSearchParams',
      'TextEncoder', 'TextDecoder', 'Blob', 'File', 'FileReader', 'FormData',
      'XMLHttpRequest', 'WebSocket', 'localStorage', 'sessionStorage',
      'Uint8Array', 'Int8Array', 'Uint16Array', 'Int16Array', 'Uint32Array',
      'Int32Array', 'Float32Array', 'Float64Array', 'ArrayBuffer', 'DataView',
      // TypeScript specific
      'Partial', 'Required', 'Readonly', 'Record', 'Pick', 'Omit', 'Exclude',
      'Extract', 'NonNullable', 'Parameters', 'ReturnType', 'InstanceType'
    ]),
    tokenPatterns: [
      { type: 'comment', re: /\/\/[^\n]*/y },
      { type: 'comment', re: /\/\*[\s\S]*?\*\//y },
      { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
      { type: 'string', re: /'(?:[^'\\]|\\.)*'/y },
      { type: 'string', re: /`(?:[^`\\]|\\.)*`/y },
      { type: 'regex', re: /\/(?![*/])(?:[^\\/\n]|\\.)+\/[gimsuy]*/y },
      { type: 'number', re: /\b(?:0x[\da-fA-F]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/y },
      { type: 'operator', re: /[+\-*/%=<>!&|^~?:]+|\.{3}/y },
      { type: 'word', re: /[a-zA-Z_$][\w$]*/y },
      { type: 'punctuation', re: /[{}()\[\];,.<>]/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  },
  python: {
    name: 'Python',
    aliases: ['py', 'python', 'python3'],
    runnable: false,
    keywords: new Set([
      'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
      'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
      'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
      'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
      'while', 'with', 'yield'
    ]),
    builtins: new Set([
      'abs', 'all', 'any', 'bin', 'bool', 'bytes', 'callable', 'chr',
      'classmethod', 'compile', 'complex', 'dict', 'dir', 'divmod',
      'enumerate', 'eval', 'exec', 'filter', 'float', 'format', 'frozenset',
      'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input',
      'int', 'isinstance', 'issubclass', 'iter', 'len', 'list', 'locals',
      'map', 'max', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow',
      'print', 'property', 'range', 'repr', 'reversed', 'round', 'set',
      'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super',
      'tuple', 'type', 'vars', 'zip', 'self'
    ]),
    tokenPatterns: [
      { type: 'comment', re: /#[^\n]*/y },
      { type: 'string', re: /"""[\s\S]*?"""/y },
      { type: 'string', re: /'''[\s\S]*?'''/y },
      { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
      { type: 'string', re: /'(?:[^'\\]|\\.)*'/y },
      { type: 'string', re: /f"(?:[^"\\]|\\.)*"/y },
      { type: 'string', re: /f'(?:[^'\\]|\\.)*'/y },
      { type: 'number', re: /\b(?:0x[\da-fA-F]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:e[+-]?\d+)?j?)\b/y },
      { type: 'operator', re: /[+\-*/%=<>!&|^~@:]+/y },
      { type: 'word', re: /[a-zA-Z_]\w*/y },
      { type: 'punctuation', re: /[{}()\[\];,.]/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  },
  html: {
    name: 'HTML',
    aliases: ['html', 'htm'],
    runnable: false,
    tokenPatterns: [
      { type: 'comment', re: /<!--[\s\S]*?-->/y },
      { type: 'tag', re: /<\/?[a-zA-Z][a-zA-Z0-9-]*(?:\s+[^>]*)?\/?>/y },
      { type: 'string', re: /"[^"]*"/y },
      { type: 'string', re: /'[^']*'/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  },
  css: {
    name: 'CSS',
    aliases: ['css'],
    runnable: false,
    keywords: new Set([
      'important', 'inherit', 'initial', 'unset', 'revert'
    ]),
    tokenPatterns: [
      { type: 'comment', re: /\/\*[\s\S]*?\*\//y },
      { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
      { type: 'string', re: /'(?:[^'\\]|\\.)*'/y },
      { type: 'number', re: /\b\d+\.?\d*(?:px|em|rem|%|vh|vw|deg|s|ms)?\b/y },
      { type: 'selector', re: /[.#]?[a-zA-Z_-][a-zA-Z0-9_-]*/y },
      { type: 'operator', re: /[:;{}(),>+~*]/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  },
  json: {
    name: 'JSON',
    aliases: ['json'],
    runnable: false,
    keywords: new Set(['true', 'false', 'null']),
    tokenPatterns: [
      { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
      { type: 'number', re: /-?\b\d+\.?\d*(?:e[+-]?\d+)?\b/y },
      { type: 'keyword', re: /\b(?:true|false|null)\b/y },
      { type: 'punctuation', re: /[{}\[\]:,]/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  },
  markdown: {
    name: 'Markdown',
    aliases: ['md', 'markdown'],
    runnable: false,
    tokenPatterns: [
      { type: 'heading', re: /^#{1,6}\s+.+$/my },
      { type: 'code', re: /`[^`\n]+`/y },
      { type: 'bold', re: /\*\*[^*]+\*\*/y },
      { type: 'italic', re: /\*[^*]+\*/y },
      { type: 'link', re: /\[[^\]]+\]\([^)]+\)/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  },
  shell: {
    name: 'Shell',
    aliases: ['sh', 'bash', 'zsh', 'shell'],
    runnable: false,
    keywords: new Set([
      'if', 'then', 'else', 'elif', 'fi', 'case', 'esac', 'for', 'while',
      'do', 'done', 'in', 'function', 'return', 'exit', 'export', 'local',
      'readonly', 'shift', 'until', 'select'
    ]),
    builtins: new Set([
      'echo', 'cd', 'pwd', 'ls', 'cat', 'grep', 'sed', 'awk', 'find',
      'mkdir', 'rm', 'cp', 'mv', 'chmod', 'chown', 'curl', 'wget',
      'source', 'alias', 'unalias', 'set', 'unset', 'test'
    ]),
    tokenPatterns: [
      { type: 'comment', re: /#[^\n]*/y },
      { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
      { type: 'string', re: /'[^']*'/y },
      { type: 'variable', re: /\$[a-zA-Z_][a-zA-Z0-9_]*/y },
      { type: 'variable', re: /\$\{[^}]+\}/y },
      { type: 'number', re: /\b\d+\b/y },
      { type: 'word', re: /[a-zA-Z_][a-zA-Z0-9_-]*/y },
      { type: 'operator', re: /[|&;<>()]/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  },
  sql: {
    name: 'SQL',
    aliases: ['sql'],
    runnable: false,
    keywords: new Set([
      'select', 'from', 'where', 'and', 'or', 'not', 'in', 'like', 'between',
      'is', 'null', 'as', 'join', 'inner', 'left', 'right', 'outer', 'on',
      'group', 'by', 'having', 'order', 'asc', 'desc', 'limit', 'offset',
      'insert', 'into', 'values', 'update', 'set', 'delete', 'create',
      'table', 'drop', 'alter', 'add', 'column', 'index', 'primary', 'key',
      'foreign', 'references', 'unique', 'default', 'constraint', 'distinct',
      'union', 'all', 'case', 'when', 'then', 'else', 'end', 'exists', 'true', 'false'
    ]),
    builtins: new Set([
      'count', 'sum', 'avg', 'min', 'max', 'coalesce', 'nullif', 'cast',
      'convert', 'concat', 'substring', 'length', 'upper', 'lower', 'trim',
      'now', 'date', 'time', 'timestamp', 'int', 'varchar', 'text', 'boolean'
    ]),
    tokenPatterns: [
      { type: 'comment', re: /--[^\n]*/y },
      { type: 'comment', re: /\/\*[\s\S]*?\*\//y },
      { type: 'string', re: /'(?:[^'\\]|\\.)*'/y },
      { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
      { type: 'number', re: /\b\d+\.?\d*\b/y },
      { type: 'word', re: /[a-zA-Z_][a-zA-Z0-9_]*/y },
      { type: 'operator', re: /[=<>!+\-*/%]/y },
      { type: 'punctuation', re: /[();,.*]/y },
      { type: 'whitespace', re: /\s+/y },
    ]
  }
}

function getLanguageConfig(alias) {
  if (!alias) return null
  const lower = alias.toLowerCase()
  for (const [, config] of Object.entries(languages)) {
    if (config.aliases.includes(lower)) {
      return config
    }
  }
  return null
}

// Check if a language is supported for syntax highlighting
function isLanguageSupported(alias) {
  return getLanguageConfig(alias) !== null
}

// Check if a language can be run in browser
function isLanguageRunnable(alias) {
  const config = getLanguageConfig(alias)
  return config?.runnable ?? false
}

// Escape HTML entities
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Highlight code based on language
function highlightCode(code, langAlias) {
  const config = getLanguageConfig(langAlias)
  
  // No highlighting for unsupported languages
  if (!config || !config.tokenPatterns) {
    return escapeHtml(code)
  }

  let html = ''
  let i = 0
  const { tokenPatterns, keywords, builtins } = config

  while (i < code.length) {
    let matched = false
    for (const pat of tokenPatterns) {
      pat.re.lastIndex = i
      const match = pat.re.exec(code)
      if (match && match.index === i) {
        const token = match[0]
        let className = null

        switch (pat.type) {
          case 'comment':
            className = 'ce-comment'
            break
          case 'string':
            className = 'ce-string'
            break
          case 'number':
            className = 'ce-number'
            break
          case 'regex':
            className = 'ce-regex'
            break
          case 'operator':
            className = 'ce-operator'
            break
          case 'keyword':
            className = 'ce-keyword'
            break
          case 'tag':
            className = 'ce-tag'
            break
          case 'selector':
            className = 'ce-selector'
            break
          case 'heading':
            className = 'ce-heading'
            break
          case 'code':
            className = 'ce-code'
            break
          case 'bold':
            className = 'ce-bold'
            break
          case 'italic':
            className = 'ce-italic'
            break
          case 'link':
            className = 'ce-link'
            break
          case 'variable':
            className = 'ce-variable'
            break
          case 'word':
            if (keywords?.has(token)) {
              className = 'ce-keyword'
            } else if (builtins?.has(token)) {
              className = 'ce-builtin'
            } else if (i + token.length < code.length && code[i + token.length] === '(') {
              className = 'ce-function'
            }
            break
        }

        html += className ? `<span class="${className}">${escapeHtml(token)}</span>` : escapeHtml(token)
        i += token.length
        matched = true
        break
      }
    }
    if (!matched) {
      html += escapeHtml(code[i])
      i++
    }
  }
  return html
}

function stripTypeAnnotations(code) {
  return code
    .replace(/:\s*[A-Za-z<>[\]|&,\s]+(?=[,)\]=;])/g, '') // Type annotations
    .replace(/\bas\s+[A-Za-z<>[\]|&]+/g, '') // Type assertions
    .replace(/<[A-Za-z<>[\]|&,\s]+>(?=\()/g, '') // Generic type parameters in calls
    .replace(/^(interface|type)\s+.*$/gm, '') // Interface/type declarations
}

// Execute JavaScript/TypeScript code
function executeCode(code, langAlias, outputContent) {
  const logs = []
  const customConsole = {
    log: (...args) => logs.push({ type: 'log', args }),
    error: (...args) => logs.push({ type: 'error', args }),
    warn: (...args) => logs.push({ type: 'warn', args }),
    info: (...args) => logs.push({ type: 'info', args }),
    clear: () => { logs.length = 0 },
  }

  try {
    // For TypeScript, strip type annotations before execution
    let executableCode = code
    if (langAlias === 'ts' || langAlias === 'typescript') {
      executableCode = stripTypeAnnotations(code)
    }

    // Create a function with custom console in scope
    const fn = new Function('console', executableCode)
    fn(customConsole)

    // Render logs
    logs.forEach(({ type, args }) => {
      const line = document.createElement('div')
      line.className = type
      line.textContent = args.map(arg => {
        if (typeof arg === 'object') {
          try { return JSON.stringify(arg, null, 2) }
          catch { return String(arg) }
        }
        return String(arg)
      }).join(' ')
      outputContent.appendChild(line)
    })

    if (logs.length === 0) {
      const line = document.createElement('div')
      line.className = 'info'
      line.textContent = '✓ Code executed successfully (no output)'
      outputContent.appendChild(line)
    }
  } catch (err) {
    const line = document.createElement('div')
    line.className = 'error'
    line.textContent = err.toString()
    outputContent.appendChild(line)
  }
}

function createCodeEditor(rawCode, saveCallback) {
  const langMatch = rawCode.match(/^```(\w*)/)
  const langAlias = langMatch?.[1] || ''
  const firstNewline = rawCode.indexOf('\n')
  const codeBody = rawCode.slice(firstNewline + 1, -4).trim() // Remove fence and closing ```

  const langConfig = getLanguageConfig(langAlias)
  const displayName = langConfig?.name || langAlias.toUpperCase() || 'Plain Text'
  const canRun = isLanguageRunnable(langAlias)

  const container = document.createElement('div')
  container.className = 'code-editor'
  container.contentEditable = 'false'

  // Store raw markdown for saving
  container.dataset.raw = rawCode

  // Header with language selector and action buttons
  const header = document.createElement('div')
  header.className = 'code-editor-header'

  // Language selector dropdown
  const langSelect = document.createElement('select')
  langSelect.className = 'code-editor-lang-select'
  langSelect.title = 'Change language'
  
  // Add "Plain Text" option
  const plainOption = document.createElement('option')
  plainOption.value = ''
  plainOption.textContent = 'Plain Text'
  langSelect.appendChild(plainOption)
  
  // Add all supported languages
  for (const [key, config] of Object.entries(languages)) {
    const option = document.createElement('option')
    option.value = config.aliases[0] // Use first alias as value
    option.textContent = config.name
    if (config.aliases.includes(langAlias.toLowerCase())) {
      option.selected = true
    }
    langSelect.appendChild(option)
  }
  
  if (!langConfig) {
    plainOption.selected = true
  }

  // Track current language for updates
  let currentLangAlias = langAlias

  const actions = document.createElement('div')
  actions.className = 'code-editor-actions'

  const copyBtn = document.createElement('button')
  copyBtn.className = 'code-editor-btn copy'
  copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy`

  actions.appendChild(copyBtn)

  // Only add run button for runnable languages
  let runBtn = null
  if (canRun) {
    runBtn = document.createElement('button')
    runBtn.className = 'code-editor-btn run'
    runBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Run`
    actions.appendChild(runBtn)
  }

  // Function to update run button visibility
  const updateRunButton = (newLangAlias) => {
    const newCanRun = isLanguageRunnable(newLangAlias)
    if (newCanRun && !runBtn) {
      runBtn = document.createElement('button')
      runBtn.className = 'code-editor-btn run'
      runBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Run`
      runBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        if (!output) {
          // Create output area if it doesn't exist
          output = document.createElement('div')
          output.className = 'code-editor-output'
          
          const outputHeader = document.createElement('div')
          outputHeader.className = 'code-editor-output-header'
          
          const outputLabel = document.createElement('span')
          outputLabel.textContent = 'Output'
          
          const clearBtn = document.createElement('button')
          clearBtn.className = 'code-editor-output-clear'
          clearBtn.textContent = 'Clear'
          clearBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            output.style.display = 'none'
            outputContent.innerHTML = ''
          })
          
          outputHeader.appendChild(outputLabel)
          outputHeader.appendChild(clearBtn)
          
          outputContent = document.createElement('div')
          outputContent.className = 'code-editor-output-content'
          
          output.appendChild(outputHeader)
          output.appendChild(outputContent)
          container.appendChild(output)
        }
        output.style.display = 'block'
        outputContent.innerHTML = ''
        executeCode(textarea.value, currentLangAlias, outputContent)
      })
      actions.appendChild(runBtn)
    } else if (!newCanRun && runBtn) {
      runBtn.remove()
      runBtn = null
      if (output) {
        output.style.display = 'none'
      }
    }
  }

  // Language change handler
  langSelect.addEventListener('change', () => {
    currentLangAlias = langSelect.value
    
    // Update syntax highlighting
    highlight.innerHTML = highlightCode(textarea.value, currentLangAlias)
    
    // Update raw data for saving
    container.dataset.raw = '```' + currentLangAlias + '\n' + textarea.value + '\n```'
    
    // Update run button visibility
    updateRunButton(currentLangAlias)
    
    // Trigger save
    if (saveCallback) saveCallback()
  })

  header.appendChild(langSelect)
  header.appendChild(actions)

  // Code body with textarea for editing
  const body = document.createElement('div')
  body.className = 'code-editor-body'

  const textarea = document.createElement('textarea')
  textarea.className = 'code-editor-textarea'
  textarea.value = codeBody
  textarea.spellcheck = false
  textarea.autocomplete = 'off'
  textarea.autocapitalize = 'off'

  // Syntax highlighting overlay
  const highlight = document.createElement('pre')
  highlight.className = 'code-editor-highlight'
  highlight.innerHTML = highlightCode(codeBody, langAlias)

  body.appendChild(highlight)
  body.appendChild(textarea)

  // Output area (only for runnable languages)
  let output = null
  let outputContent = null
  if (canRun) {
    output = document.createElement('div')
    output.className = 'code-editor-output'
    output.style.display = 'none'

    const outputHeader = document.createElement('div')
    outputHeader.className = 'code-editor-output-header'

    const outputLabel = document.createElement('span')
    outputLabel.textContent = 'Output'

    const clearBtn = document.createElement('button')
    clearBtn.className = 'code-editor-output-clear'
    clearBtn.textContent = 'Clear'

    outputHeader.appendChild(outputLabel)
    outputHeader.appendChild(clearBtn)

    outputContent = document.createElement('div')
    outputContent.className = 'code-editor-output-content'

    output.appendChild(outputHeader)
    output.appendChild(outputContent)

    // Clear button handler
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      output.style.display = 'none'
      outputContent.innerHTML = ''
    })
  }

  container.appendChild(header)
  container.appendChild(body)
  if (output) container.appendChild(output)

  // Calculate initial height based on content lines to prevent flicker
  const lineCount = codeBody.split('\n').length
  const lineHeight = 21 // 14px font * 1.5 line-height
  const padding = 24 // 12px top + 12px bottom
  const initialHeight = Math.max(80, lineCount * lineHeight + padding)
  textarea.style.height = initialHeight + 'px'

  // Auto-resize textarea and sync highlight
  const autoResize = () => {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
  const updateHighlight = () => {
    highlight.innerHTML = highlightCode(textarea.value, currentLangAlias)
  }
  textarea.addEventListener('input', () => {
    autoResize()
    updateHighlight()
  })
  textarea.addEventListener('scroll', () => {
    highlight.scrollTop = textarea.scrollTop
    highlight.scrollLeft = textarea.scrollLeft
  })

  const debounce = (ms, fn) => {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => fn(...args), ms)
    }
  }

  // Update raw data when code changes (for saving)
  const debouncedSave = saveCallback ? debounce(500, saveCallback) : () => {}
  textarea.addEventListener('input', () => {
    container.dataset.raw = '```' + currentLangAlias + '\n' + textarea.value + '\n```'
    debouncedSave()
  })

  // Copy button
  copyBtn.addEventListener('click', async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(textarea.value)
      copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>Copied!`
      setTimeout(() => {
        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy`
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  })

  // Run button (only for runnable languages)
  if (runBtn && output && outputContent) {
    runBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      output.style.display = 'block'
      outputContent.innerHTML = ''
      executeCode(textarea.value, currentLangAlias, outputContent)
    })
  }

  // Prevent editor from handling clicks inside code editor
  container.addEventListener('click', e => e.stopPropagation())
  container.addEventListener('mousedown', e => e.stopPropagation())
  container.addEventListener('keydown', e => e.stopPropagation())
  container.addEventListener('keyup', e => e.stopPropagation())
  container.addEventListener('input', e => e.stopPropagation())

  return container
}

// Check if raw code should use code editor
function shouldUseCodeEditor(rawCode) {
  return /^```\w*/i.test(rawCode)
}

// Export for use in main app
window.CodeEditor = {
  create: createCodeEditor,
  highlight: highlightCode,
  isSupported: isLanguageSupported,
  isRunnable: isLanguageRunnable,
  getConfig: getLanguageConfig,
  shouldUse: shouldUseCodeEditor,
  languages
}

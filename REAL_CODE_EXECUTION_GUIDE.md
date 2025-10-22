# Real Code Execution Guide

## Overview
The Code Editor Notebook now provides **actual code execution** instead of simulation. Your code runs in real runtime environments with actual output.

## Execution Modes

### 1. Browser Execution (JavaScript/TypeScript)
- **Languages**: JavaScript, TypeScript
- **How it works**: Code executes in a sandboxed browser environment
- **Features**:
  - Instant execution
  - No network required
  - Safe sandboxed environment
  - Access to standard JavaScript APIs
- **Limitations**:
  - No file system access
  - No Node.js modules
  - 5-second timeout for safety

### 2. Remote Execution (Python, Java, C, C++)
- **Languages**: Python, Java, C, C++
- **How it works**: Code is sent to Piston API for execution
- **Features**:
  - Real compiler/interpreter execution
  - Actual runtime output
  - Support for standard libraries
  - Error messages and stack traces
- **API Used**: [Piston API](https://github.com/engineer-man/piston)
- **Versions**:
  - Python: 3.10.0
  - Java: 15.0.2
  - C++: GCC 10.2.0
  - C: GCC 10.2.0

## Supported Languages

### ✅ Fully Supported
| Language   | Execution Type | Features |
|-----------|----------------|----------|
| Python    | Remote (Piston) | Standard library, print(), input simulation |
| JavaScript | Browser | Console logging, async/await, modern ES6+ |
| TypeScript | Browser | Type checking in editor, executes as JS |
| Java      | Remote (Piston) | Full compilation, main method required |
| C++       | Remote (Piston) | STL support, iostream, vectors |
| C         | Remote (Piston) | stdio.h, stdlib.h, standard C features |

### ⚠️ Limited Support
| Language | Status | Notes |
|---------|--------|-------|
| HTML/CSS | Preview only | Shows validation message, use browser preview |

## Code Examples

### Python (Real Execution)
```python
# This actually runs!
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(f"Factorial of 5: {factorial(5)}")

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")
```

### JavaScript (Browser Execution)
```javascript
// Executes in sandboxed browser environment
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log(`Fibonacci 10: ${fibonacci(10)}`);

// Async operations
async function getData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data loaded!"), 100);
  });
}

getData().then(console.log);
```

### C++ (Real Compilation & Execution)
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {5, 2, 8, 1, 9};
    std::sort(nums.begin(), nums.end());
    
    for(int n : nums) {
        std::cout << n << " ";
    }
    return 0;
}
```

### Java (Real Compilation & Execution)
```java
public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        
        for(int num : numbers) {
            sum += num;
        }
        
        System.out.println("Sum: " + sum);
    }
}
```

## Features

### Editor Mode
- ✅ Real-time code execution
- ✅ Actual compiler/interpreter output
- ✅ Error messages and stack traces
- ✅ Syntax highlighting
- ✅ Code completion (Monaco Editor)
- ✅ Multi-line support
- ✅ Copy/Download code
- ✅ Reset to template

### Notebook Mode
- ✅ Multiple code cells
- ✅ Markdown cells for documentation
- ✅ Individual cell execution
- ✅ Cell output display
- ✅ Add/Delete cells
- ✅ Mixed language support (per cell)

## Execution Flow

### JavaScript/TypeScript
```
Your Code → Sandboxed Function → Browser Execution → Console Output
```

### Python/Java/C/C++
```
Your Code → Piston API → Real Compiler/Interpreter → Stdout/Stderr → Output
```

## Error Handling

### Syntax Errors
- Displayed with line numbers (when available)
- Clear error messages
- Stack traces for debugging

### Runtime Errors
- Exception messages
- Error type identification
- Helpful debugging info

### Network Errors
- Fallback messages
- Clear API error indication
- Retry suggestions

## Best Practices

### For Python
```python
# ✅ DO: Use print() for output
print("Hello, World!")

# ✅ DO: Handle exceptions
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# ❌ DON'T: Use input() - not supported in remote execution
# name = input("Enter name: ")  # This won't work
```

### For JavaScript
```javascript
// ✅ DO: Use console.log()
console.log("Output here");

// ✅ DO: Use modern JS features
const arr = [1, 2, 3].map(x => x * 2);
console.log(arr);

// ⚠️ CAREFUL: DOM access not available
// document.getElementById() won't work
```

### For C/C++
```cpp
// ✅ DO: Include necessary headers
#include <iostream>

// ✅ DO: Use standard namespace
using namespace std;

// ✅ DO: Return 0 from main
int main() {
    cout << "Hello!" << endl;
    return 0;
}
```

### For Java
```java
// ✅ DO: Use public class Main
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello!");
    }
}

// ❌ DON'T: Use different class names
// public class MyClass won't work with Piston
```

## Performance

### JavaScript/TypeScript
- **Speed**: Instant (< 100ms)
- **Timeout**: 5 seconds
- **Limitation**: Single-threaded

### Python
- **Speed**: 1-3 seconds (includes API call)
- **Timeout**: 15 seconds (Piston limit)
- **Limitation**: No external packages (only stdlib)

### Java/C/C++
- **Speed**: 2-5 seconds (includes compilation)
- **Timeout**: 15 seconds (Piston limit)
- **Limitation**: Standard libraries only

## Troubleshooting

### "API Error" Message
- **Cause**: Network issues or Piston API unavailable
- **Solution**: Check internet connection, try again

### "Execution timeout"
- **Cause**: Code takes too long
- **Solution**: Optimize code, reduce complexity

### "Compilation failed"
- **Cause**: Syntax errors in compiled languages
- **Solution**: Check error message, fix syntax

### No Output
- **Cause**: Code runs but produces no output
- **Solution**: Add print/console.log statements

## Limitations

### Current Limitations
- ❌ No package installation (pip, npm, etc.)
- ❌ No file I/O operations
- ❌ No interactive input (stdin)
- ❌ Limited execution time (5-15 seconds)
- ❌ No GUI frameworks
- ❌ No network requests from code

### What Works
- ✅ Standard library functions
- ✅ Console/terminal output
- ✅ Mathematical operations
- ✅ Data structures (arrays, lists, maps)
- ✅ Loops and conditionals
- ✅ Functions and classes
- ✅ Algorithm implementations

## Future Enhancements

### Planned Features
- [ ] Package installation support
- [ ] File upload/download
- [ ] Interactive input
- [ ] Code sharing (URL generation)
- [ ] Execution history
- [ ] Performance metrics
- [ ] More language support (Go, Rust, etc.)
- [ ] Custom runtime versions
- [ ] Collaborative editing

## Security

### Sandboxing
- JavaScript/TypeScript executes in isolated environment
- No access to sensitive browser APIs
- Remote execution isolated on Piston servers

### Safety Features
- Execution timeouts prevent infinite loops
- Resource limits on Piston API
- No file system access
- No network access from code

## Support

### Tested Scenarios
- ✅ Algorithm implementations
- ✅ Data structure operations
- ✅ Mathematical computations
- ✅ String manipulation
- ✅ Array/List processing
- ✅ Object-oriented programming
- ✅ Functional programming patterns

### Report Issues
If you encounter problems:
1. Check the error message
2. Verify code syntax
3. Ensure language is supported
4. Check internet connection
5. Try simpler code first

## Credits

- **Monaco Editor**: Microsoft's code editor (VS Code engine)
- **Piston API**: Open-source code execution engine
- **React**: UI framework

---

**Note**: This is a learning environment. For production applications, use proper development tools and environments.

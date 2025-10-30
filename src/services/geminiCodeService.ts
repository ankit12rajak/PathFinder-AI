import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  analysis?: {
    codeQuality: number; // 0-100
    correctness: number; // 0-100
    efficiency: number; // 0-100
    bestPractices: number; // 0-100;
    overallScore: number; // 0-100
    strengths: string[];
    improvements: string[];
    feedback: string;
    bugs: string[];
    suggestions: string[];
  };
  executionTime?: string;
  syntaxErrors?: string[];
}

/**
 * Analyzes and executes code using Gemini API
 * @param code - The code to analyze and execute
 * @param language - Programming language
 * @param problemDescription - Optional problem description for context
 */
export async function analyzeAndExecuteCode(
  code: string,
  language: string,
  problemDescription?: string
): Promise<CodeExecutionResult> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an expert coding interviewer and code analyzer. Analyze the following ${language} code and provide detailed feedback.

${problemDescription ? `Problem: ${problemDescription}\n\n` : ''}
Code to analyze:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. **Syntax Check**: Identify any syntax errors (return empty array if none)
2. **Code Execution**: Simulate the execution and provide the output (or explain what it would output)
3. **Code Analysis**: Provide detailed analysis with scores (0-100) for:
   - Code Quality (readability, structure, naming)
   - Correctness (does it solve the problem correctly?)
   - Efficiency (time/space complexity)
   - Best Practices (follows language conventions)
4. **Strengths**: List 2-3 things done well
5. **Improvements**: List 2-3 areas for improvement
6. **Bugs**: List any bugs or logical errors (empty if none)
7. **Suggestions**: Specific actionable suggestions
8. **Feedback**: Overall constructive feedback (2-3 sentences)

Return your response in the following JSON format:
{
  "syntaxErrors": ["error1", "error2"] or [],
  "output": "simulated execution output",
  "codeQuality": 85,
  "correctness": 90,
  "efficiency": 75,
  "bestPractices": 80,
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "bugs": ["bug1"] or [],
  "suggestions": ["suggestion1", "suggestion2"],
  "feedback": "overall feedback"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Calculate overall score
    const overallScore = Math.round(
      (analysis.codeQuality + 
       analysis.correctness + 
       analysis.efficiency + 
       analysis.bestPractices) / 4
    );

    return {
      success: analysis.syntaxErrors.length === 0,
      output: analysis.output,
      error: analysis.syntaxErrors.length > 0 ? analysis.syntaxErrors.join("\n") : undefined,
      syntaxErrors: analysis.syntaxErrors,
      executionTime: "< 1s (simulated)",
      analysis: {
        codeQuality: analysis.codeQuality,
        correctness: analysis.correctness,
        efficiency: analysis.efficiency,
        bestPractices: analysis.bestPractices,
        overallScore,
        strengths: analysis.strengths,
        improvements: analysis.improvements,
        feedback: analysis.feedback,
        bugs: analysis.bugs,
        suggestions: analysis.suggestions
      }
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      success: false,
      output: "",
      error: error instanceof Error ? error.message : "Failed to analyze code with Gemini API. Please check your API key.",
    };
  }
}

/**
 * Quick syntax check only (faster)
 */
export async function quickSyntaxCheck(
  code: string,
  language: string
): Promise<{ valid: boolean; errors: string[] }> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Check if this ${language} code has any syntax errors. Return ONLY a JSON object with this format:
{
  "valid": true/false,
  "errors": ["error1", "error2"] or []
}

Code:
\`\`\`${language}
${code}
\`\`\``;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { valid: true, errors: [] };
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Syntax check error:", error);
    return { valid: true, errors: [] }; // Fail open
  }
}

/**
 * Get code improvement suggestions
 */
export async function getCodeSuggestions(
  code: string,
  language: string,
  specificIssue?: string
): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Provide 3-5 specific, actionable suggestions to improve this ${language} code${specificIssue ? ` focusing on: ${specificIssue}` : ''}.

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY a JSON array of suggestions:
["suggestion1", "suggestion2", "suggestion3"]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return ["Consider adding comments", "Check edge cases", "Optimize time complexity"];
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error getting suggestions:", error);
    return ["Consider adding comments", "Check edge cases", "Optimize time complexity"];
  }
}

export default {
  analyzeAndExecuteCode,
  quickSyntaxCheck,
  getCodeSuggestions
};

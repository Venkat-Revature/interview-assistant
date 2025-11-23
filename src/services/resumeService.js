import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import mammoth from 'mammoth';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from PDF file
 */
const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw error;
  }
};

/**
 * Extract text from DOCX file
 */
const extractTextFromDOCX = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting DOCX text:', error);
    throw error;
  }
};

/**
 * Extract name from resume text
 */
const extractName = (text) => {
  // Look for name patterns at the beginning of the resume
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  // Try first few lines
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();
    
    // Skip common header words
    if (line.toLowerCase().includes('resume') || 
        line.toLowerCase().includes('curriculum') ||
        line.toLowerCase().includes('cv')) {
      continue;
    }
    
    // Check if line looks like a name (2-4 words, capitalized)
    const words = line.split(/\s+/);
    if (words.length >= 2 && words.length <= 4) {
      const isCapitalized = words.every(word => 
        word.length > 0 && word[0] === word[0].toUpperCase()
      );
      
      if (isCapitalized && !line.includes('@') && !line.match(/\d{3}/)) {
        return line;
      }
    }
  }
  
  return null;
};

/**
 * Extract email from resume text
 */
const extractEmail = (text) => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex);
  return matches ? matches[0] : null;
};

/**
 * Extract phone number from resume text
 */
const extractPhone = (text) => {
  // Various phone number patterns
  const phonePatterns = [
    /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, // US format
    /(\+\d{1,3}[-.\s]?)?\d{10}/g, // 10 digits
    /(\+\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, // With separators
  ];
  
  for (const pattern of phonePatterns) {
    const matches = text.match(pattern);
    if (matches && matches[0]) {
      return matches[0];
    }
  }
  
  return null;
};

/**
 * Main function to extract resume data
 */
export const extractResumeData = async (file) => {
  try {
    let text = '';
    
    // Extract text based on file type
    if (file.type === 'application/pdf') {
      text = await extractTextFromPDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      text = await extractTextFromDOCX(file);
    } else {
      throw new Error('Unsupported file type');
    }

    // Extract information
    const name = extractName(text);
    const email = extractEmail(text);
    const phone = extractPhone(text);

    return {
      name,
      email,
      phone,
      rawText: text,
      fileName: file.name,
    };
  } catch (error) {
    console.error('Error extracting resume data:', error);
    throw error;
  }
};

/**
 * Validate extracted data
 */
export const validateResumeData = (data) => {
  const errors = [];
  
  if (!data.name) {
    errors.push('Name not found in resume');
  }
  
  if (!data.email) {
    errors.push('Email not found in resume');
  }
  
  if (!data.phone) {
    errors.push('Phone number not found in resume');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
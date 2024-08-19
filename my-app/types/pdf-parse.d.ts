declare module 'pdf-parse' {
    interface PDFParseResult {
      text: string;
      numpages: number;
      info: {
        PDFFormatVersion: string;
        IsAcroFormPresent: boolean;
        IsXFAPresent: boolean;
        Producer: string;
        CreationDate: Date;
        ModDate: Date;
        Title: string;
        Author: string;
        Subject: string;
        Keywords: string;
        Creator: string;
      };
      metadata: any;
    }
  
    function pdfParse(buffer: Buffer): Promise<PDFParseResult>;
  
    export = pdfParse;
  }

  
  
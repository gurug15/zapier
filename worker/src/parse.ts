export function parser(text: string, startdelemeter = "{", enddelemeter = "}", value: any): string {
    // if (text === undefined) {
    //   console.error("Parser received undefined text");
    //   return "[Error: Undefined input]";
    // }
  
    let finalString = '';
    let startIndex = 0;
  
    try {
      while (startIndex < text.length) {
        if (text[startIndex] === startdelemeter) {
          let endPoint = startIndex + 1;
          while (endPoint < text.length && text[endPoint] !== enddelemeter) {
            endPoint++;
          }
  
          if (endPoint === text.length) {
            throw new Error(`Unmatched delimiter: ${startdelemeter} at position ${startIndex}`);
          }
  
          // Extract the key within the brackets
          let bracketContaingVal = text.slice(startIndex + 1, endPoint).trim();
          const keys = bracketContaingVal.split('.');
  
          // Retrieve the value from the provided object
          let localValues: any;
          try {
            localValues = value ? JSON.parse(JSON.stringify(value)) : {};
          } catch (error) {
            console.error("Error parsing value object:", error);
            throw new Error("Invalid value object provided");
          }
          
          try {
            for (let i = 0; i < keys.length; i++) {
              if (localValues === undefined || localValues === null) {
                throw new Error(`Cannot access property '${keys[i]}' of undefined or null`);
              }
              localValues = localValues[keys[i]];
            }
          } catch (error) {
            console.error(`Error accessing nested property: ${bracketContaingVal}`, error);
            localValues = `[Error: ${(error as Error).message}]`;
          }
  
          // Append the resolved value to finalString
          finalString += localValues !== undefined ? localValues : `[Undefined: ${bracketContaingVal}]`;
  
          // Move startIndex to after the end delimiter
          startIndex = endPoint + 1;
        } else {
          finalString += text[startIndex];
          startIndex++;
        }
      }
    } catch (error) {
      console.error("Error in parser function:", error);
      return `Error parsing text: ${(error as Error).message}`;
    }
  
    return finalString;
  }
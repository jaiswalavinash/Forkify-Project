
declare module 'fractional' {
    // Define the interface for the 'Fraction' class
    interface Fraction {
      numerator: number;
      denominator: number;
      toString(): string;
      // Add more methods and properties specific to the 'Fraction' class if needed
    }
  
    // If there are other exports from the 'fractional' module, you can declare them here as well
    // For example, if there's a utility function called 'addFractions':
    // function addFractions(fraction1: Fraction, fraction2: Fraction): Fraction;
  
    // If the 'fractional' module exports other types or interfaces, you can declare them here too
  
    // If the 'fractional' module uses a default export, you can declare it like this:
    // export default Fraction;
  }
  
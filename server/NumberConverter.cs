
public class NumberConverter
{

    public static string ConvertToWords(string value)
    {
        string[] parts = value.Split('.');

        if (parts.Length == 1)
        {
            if (!long.TryParse(parts[0], out long wholePart))
            {
                return "Invalid input! Please provide a valid number.";
            }

            return ConvertWholePartToWords(wholePart);
        }
        else if (parts.Length == 2)
        {
            string wholePartString = parts[0];
            string fractionalPartString = parts[1].PadRight(2, '0')[..2];

            if (!long.TryParse(wholePartString, out long wholePart) || !int.TryParse(fractionalPartString, out int fractionalPart))
            {
                return "Invalid input! Please provide a valid decimal number.";
            }

            string wholePartWords = $"{ConvertWholePartToWords(wholePart)} dollars";
            string fractionalPartWords = $"{ConvertWholePartToWords(fractionalPart)} cents";

            decimal number = decimal.Parse(value);
            if (number >= 10000000000000)
                return "Sorry! too big to convert";

            if (fractionalPart == 0)
                return wholePartWords;
            else
                return $"{wholePartWords} and {fractionalPartWords}";
        }
        else
        {
            return "Invalid input! Please provide a valid decimal number.";
        }
    }


    private static string ConvertWholePartToWords(long number)
    {

        if (number == 0)
            return "zero";

        if (number < 0)
            return "minus " + ConvertWholePartToWords(Math.Abs(number));

        string words = "";
        string[] placeValues = ["trillion", "billion", "million", "thousand", "hundred"];
        long[] divisors = [1000000000000, 1000000000, 1000000, 1000, 100];

        for (int i = 0; i < placeValues.Length; i++)
        {
            if (number >= divisors[i])
            {
                words += ConvertWholePartToWords(number / divisors[i]) + " " + placeValues[i] + " ";
                number %= divisors[i];
            }
            Console.WriteLine(number);
            Console.WriteLine(words);
        }

        words += ConvertSmallNumberToWords(number);

        return words;
    }


    private static string ConvertSmallNumberToWords(long number)
    {
        if (number <= 0) return "";

        var unitsMap = new[]
        {
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
    };

        var teensMap = new[]
        {
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    };

        var tensMap = new[]
        {
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    };

        string words = "";

        if (number >= 20)
        {
            words += tensMap[number / 10];
            if ((number % 10) > 0)
                words += "-" + unitsMap[number % 10];
        }
        else if (number >= 10)
        {
            words += teensMap[number % 10];
        }
        else
        {
            words += unitsMap[number];
        }

        return words;
    }

}

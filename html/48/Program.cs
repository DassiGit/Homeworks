using System.Drawing;

namespace Homework
{
    internal class Program
    {

        
       static void Main(string[] args)
        {   string[] colors = { "red", "green", "blue" };
             string[] patterns = { "striped", "checked", "plain" };
            foreach (string s in colors) {
                foreach (string p in patterns)
                {
                    new Shirt(s,p);
                    Console.WriteLine($"This shirt is {s} and {p}.");
                }

                }

        }
    }

    internal class Shirt
    {   public string color;
        public string pattern;

        public Shirt(string color, string pattern)
        {
            this.color = color;
            this.pattern = pattern;
        }
        
    }
}

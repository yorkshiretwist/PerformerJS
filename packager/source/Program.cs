/*
 * Created by SharpDevelop.
 * User: chris.taylor
 * Date: 11/06/2010
 * Time: 08:45
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using JavaScriptSupport;

namespace PerformerJSPackager
{
    class Program
    {
        public static string[] InputFile;
        public static StringBuilder OutputFile;
        public static void Main(string[] args)
        {
            if (File.Exists("input/performer.js"))
            {
            	// get the source file
            	FileInfo sourceFile = new FileInfo("input/performer.js");
            	InputFile = File.ReadAllLines("input/performer.js");
                Console.WriteLine("Input file found, " + InputFile.Length.ToString() + " lines, " + sourceFile.Length.ToString() + " bytes");
                
                // do jQuery version
	            CreateVersion("jquery");
	            
	            // do Prototype version
	            CreateVersion("prototype");
	
	            // do MooTools version
	            CreateVersion("mootools");
            }
            else
            {
                Console.WriteLine("The input file at 'input/performer.js' could not be found.");
            }

            Console.WriteLine("Press 'Enter' key to close.");
            Console.ReadLine();
        }
        public static bool CreateVersion(string addName)
        {
            Console.WriteLine("Creating version: " + addName);
            OutputFile = new StringBuilder();
            Dictionary<string, bool> thisLine = new Dictionary<string, bool>();
            thisLine.Add("jquery", false);
            thisLine.Add("prototype", false);
            thisLine.Add("mootools", false);
            bool allVersions = true;
            foreach (string line in InputFile)
            {
                if (line.Contains("//+jquery"))
                {
                    thisLine["jquery"] = true;
                    allVersions = false;
                }
                if (line.Contains("//-jquery"))
                {
                    thisLine["jquery"] = false;
                    allVersions = true;
                }
                if (line.Contains("//+mootools"))
                {
                    thisLine["mootools"] = true;
                    allVersions = false;
                }
                if (line.Contains("//-mootools"))
                {
                    thisLine["mootools"] = false;
                    allVersions = true;
                }
                if (line.Contains("//+prototype"))
                {
                    thisLine["prototype"] = true;
                    allVersions = false;
                }
                if (line.Contains("//-prototype"))
                {
                    thisLine["prototype"] = false;
                    allVersions = true;
                }
                if ((allVersions || thisLine[addName] == true) && !line.Contains("//+") && !line.Contains("//-"))
                {
                    OutputFile.AppendLine(line);
                }
            }
            
            // save full version
            File.WriteAllText("output/performer." + addName + ".js", OutputFile.ToString());
            
            FileInfo fullFile = new FileInfo("output/performer." + addName + ".js");
            
            // save minified version
            JavaScriptMinifier jsmin = new JavaScriptMinifier();
            jsmin.Minify("output/performer." + addName + ".js", "output/performer." + addName + ".min.js");
            string minified = File.ReadAllText("output/performer." + addName + ".min.js");
            minified = File.ReadAllText("input/notice.txt") + minified;
            File.WriteAllText("output/performer." + addName + ".min.js", minified);
            
            FileInfo minFile = new FileInfo("output/performer." + addName + ".min.js");
            
            Console.WriteLine("Finished creating " + addName + " version: (" + fullFile.Length.ToString() + " bytes uncompressed, " + minFile.Length.ToString() + " bytes compressed");
            return true;
        }
    }
}
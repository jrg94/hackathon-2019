using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.IO;
using System.Threading.Tasks;


namespace TestWebsite_service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "BuildingSearch" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select BuildingSearch.svc or BuildingSearch.svc.cs at the Solution Explorer and start debugging.
    public class BuildingSearch : IBuildingSearch
    {

        private String[] buildings;

        public BuildingSearch()
        {
            string line;
            buildings = new String[354];
            int count = 0;
            System.IO.StreamReader file = new StreamReader("C:\\Users\\calvi\\Documents\\TestWebsite-service\\TestWebsite-service\\Hack.txt");
            while ((line = file.ReadLine()) != null)
            {
                buildings[count] = line.ToUpper().Substring(1, line.Length-2);
                count++;
            }
        }
        public String[] getBuildings(String userInput)
        {
            userInput = userInput.ToUpper();

            List<String> comparedBuildings = new List<String>();

            for (int i = 0; i < buildings.Length; i++)
            {
                String buildingName = buildings[i];
                if (buildingName.Substring(0, userInput.Length).Equals(userInput))
                {
                    comparedBuildings.Add(buildingName);
                }
            }
            System.Console.WriteLine("Printing Buildings:: ");
            System.Console.WriteLine(buildings);
            return comparedBuildings.ToArray();
        }


    }
}


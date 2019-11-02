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
        public String[] buildingConstructor()
        {
            String[] buildings = new string[216];
            int counter = 0;
            string line;
            System.IO.StreamReader file = new System.IO.StreamReader("Hack.txt");
            while ((line = file.ReadLine()) != null)
            {
                buildings[counter] = line.Substring(1, line.Length);
                counter++;
            }
            return buildings;
        }
    }
}


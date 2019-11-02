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
		String[] buildings;
        public void buildingConstructor()
        {
            string line;
            buildings = new String[403];
            int count = 0;
            System.IO.StreamReader file = new StreamReader("C:\\Users\\calvi\\Documents\\TestWebsite-service\\TestWebsite-service\\Hack.txt");
            while ((line = file.ReadLine()) != null)
            {
                buildings[count] = line.ToUpper();
                count++;
            }
            return buildings;
        }
		
		public static String[] getBuildings(String userInput)
		{
			if(buildings == null) buildingConstructor();
			userInput = userInput.ToUpper();
			
			ArrayList<String> comparedBuildings = new ArrayList<>();
			
			for(int i = 0; i < buildings.length; i++){
				String buildingName = buildings[i];
				if(buildingsName.Substring(0, userInput.length().equals(userInput))){
					comparedBuildings.Add(buildingName);
				}
			}
			
			return comparedBuildings.ToArray();
		}
		
    }
}


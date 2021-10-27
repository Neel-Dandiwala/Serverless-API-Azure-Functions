import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import productsService from "../services/productsService";

let client = new CosmosClient(process.env.CONNECTION_STRING);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
   let response;

   try {
       let products = await productsService.read();
       response = { body: products, status: 200 };
   } catch (err) {
       response = {
           body: err.message,
           status: 500
       }
   }

   context.res = response
};

export default httpTrigger;
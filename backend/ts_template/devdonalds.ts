import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: "recipe" | "ingredient";
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: cookbookEntry[] = [];

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  if (recipeName.length <= 0) {
    return null;
  }
  return recipeName.replace(
    /[-_\s]+/g, " ")
    .replace(/[^a-zA-Z\s]/g, "")
    .toLowerCase()
    .replace(/\b\w/g,(char) => char.toUpperCase());
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  const input = req.body as cookbookEntry;
  console.log("calling routeMEOWMEOWMEOW");
  const result = createEntry(input)
  if (result == false) {
    return res.status(400).send();
  } 
  return res.status(200).send();
});

function createEntry(entry: cookbookEntry): Boolean {
  console.log("calling functionMEOWMEOWMEOW");
  if (entry.type !== "recipe" && entry.type !== "ingredient") {
    console.log("fail1");
    return false;
  }

  if (cookbook.some(e => e.name === entry.name)) {
    console.log("fail2");
    return false;
  }

  if (entry.type === "ingredient") {
    const entryIngred = entry as ingredient;
    if (entryIngred.cookTime === undefined || entryIngred.cookTime < 0) {
      console.log("fail3");
      return false;
    }
  }

  if (entry.type === "recipe") {
    const entryRecipe = entry as recipe;
    if (entryRecipe.requiredItems) {
      const names = entryRecipe.requiredItems.map(reqItem => reqItem.name);

      if (new Set(names).size !== names.length) {
        console.log("fail4");
        return false;
      }
    }
  }

  cookbook.push(entry);
  console.log("SUCCESSFULLY ADDED");
  console.log(cookbook);
  return true;
} 

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});

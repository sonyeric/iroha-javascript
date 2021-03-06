/**
 * This script is runned automatically after your first npm-install.
 */
const prompt = require("prompt");
const { mv, rm, which, exec } = require("shelljs");
const replace = require("replace-in-file");
const colors = require("colors");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");

const promptSchema = {
  properties: {
    library: {
      description: colors.cyan("Enter your library name (use kebab-case)"),
      pattern: /^[a-z]+(\-[a-z]+)*$/,
      type: "string",
      required: true
    }
  }
};

const files = ["package.json", "webpack.config.ts", "LICENSE", "test/library.test.ts"];

prompt.start();
prompt.message = "";


if (!which("git")) {
  console.log(colors.red("Sorry, this script requires git"));
  process.exit(1);
}

let username, usermail;

username = exec("git config user.name").stdout.trim();
usermail = exec("git config user.email").stdout.trim();

// Clear console
let lines = process.stdout.getWindowSize()[1];
for(let i = 0; i < lines; i++) {
    console.log("\r\n");
}

// Say hi!
console.log(colors.yellow("Hi! I\"m setting things up for you!!"));

// 1. Remove .git folder
rm("-Rf", path.resolve(__dirname, "..", ".git"));
console.log("\r\n", "Removed .git directory","\r\n");

// 2. Ask for library name
prompt.get(promptSchema, (err, res) => {
  if (err) {
    console.log(colors.red("There was an error building the workspace :("));
    process.exit(1);
    return;
  }
  // 3. Replace strings in corresponding files
  replace({
    files,
    from: [/--libraryname--/g, /--username--/g, /--usermail--/g],
    to: [res.library, username, usermail]
  }, () => {
    // 4. Rename main file and test
    const renamedFiles = [`src/${res.library}.ts`, `test/${res.library}.test.ts`];
    mv(path.resolve(__dirname, "..", "src/library.ts"), path.resolve(__dirname, "..", renamedFiles[0]));
    mv(path.resolve(__dirname, "..", "test/library.test.ts"), path.resolve(__dirname, "..", renamedFiles[1]));

    console.log();
    console.log(colors.cyan(renamedFiles.join(",")) + " renamed");
    console.log(colors.cyan(files.join(",")) + " updated");

    // 5. Recreate init folder and initialize husky
    exec("git init \"" + path.resolve(__dirname, "..") + "\"");
    console.log();
    console.log(colors.cyan("Git initialized"));
    console.log();

    // 6. Remove post-install command
    const pkg = JSON.parse(readFileSync(path.resolve(__dirname, "..", "package.json")));
    delete pkg.scripts.postinstall;
    writeFileSync(path.resolve(__dirname, "..", "package.json"), JSON.stringify(pkg, null, 2));
    console.log();
    console.log(colors.cyan("Removed postinstall script"));
    console.log();

    console.log();
    console.log(colors.green("Happy coding!! ;)"));
    console.log();
  })
});

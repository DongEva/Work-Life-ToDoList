
const KNOWN_PROJECTS = ['科技馆', '美术馆', '博物馆', '南康', '北京', '展厅'];

const splitTasks = (text) => {
    // Construct dynamic regex for projects
    const projectPattern = KNOWN_PROJECTS.join('|');
    
    // Original delimiters: [,，。;；\n] | 然后|接着|还有|另外|和|与 | \d+\.
    // Added: projectPattern
    const splitRegex = new RegExp(`([,，。;；\\n]|然后|接着|还有|另外|和|与|\\d+\\.|${projectPattern})`);
    
    const parts = text.split(splitRegex);
    
    const taskBlocks = [];
    let currentBlock = "";
    let currentProject = null;
    
    console.log("Parts:", parts);

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part || !part.trim()) continue; 
        
        // Check if part is a separator
        const isStrongSep = /还有|另外|\d+\./.test(part);
        const isWeakSep = /[,，。;；]|然后|接着|\n/.test(part);
        
        // Is this part a Project Name?
        // Since we split BY project name, the part itself might BE the project name.
        let partProject = KNOWN_PROJECTS.find(p => part === p || part.includes(p));
        
        if (isStrongSep) {
             if (currentBlock) taskBlocks.push(currentBlock);
             currentBlock = "";
             currentProject = null;
             continue; 
        }
        
        if (isWeakSep) {
            if (currentBlock) currentBlock += part;
            continue;
        }
        
        // Logic for Project Context Switch
        if (partProject) {
            // If we are already in a project context, and this is a DIFFERENT project -> Split
            if (currentProject && partProject !== currentProject) {
                if (currentBlock) taskBlocks.push(currentBlock);
                currentBlock = part; // Start new block with the project name
                currentProject = partProject;
            } else {
                // Same project or first project found
                if (!currentProject) currentProject = partProject;
                currentBlock += part;
            }
        } else {
            // Regular content
            currentBlock += part;
        }
    }
    
    if (currentBlock) taskBlocks.push(currentBlock);
    
    return taskBlocks;
};

// Test Case 1: The user's failure case (Implied)
// "Mentioned Beijing and Nankang together"
const input1 = "北京项目要做A和南康项目要做B";
console.log("Input 1:", input1);
console.log("Result 1:", splitTasks(input1));

// Test Case 2: Ambiguous no-delimiter
const input2 = "明天北京开会南康写报告";
console.log("Input 2:", input2);
console.log("Result 2:", splitTasks(input2));

// Test Case 3: "Beijing and Nankang" (Just names)
const input3 = "关于北京和南康的计划";
console.log("Input 3:", input3);
console.log("Result 3:", splitTasks(input3));

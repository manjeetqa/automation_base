// Create test data generator using faker library to update the data in testdata.json

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Generate task-specific data
function generateTaskData() {
  return {
    tasks: {
      task1: {
        name: faker.lorem.words(3),
        priority: faker.number.int({ min: 1, max: 100 }).toString(),
        description: faker.lorem.paragraph(),
        assignee: faker.internet.email(),
        dueDate: faker.date.future().toISOString()
      },
      task2: {
        name: `task_${faker.string.numeric(3)}`,
        description: faker.lorem.sentence(),
        priority: faker.number.int({ min: 1, max: 100 }).toString(),
        createdDate: faker.date.recent().toISOString()
      }
    }
  };
}

// Generate project-specific data
function generateProjectData() {
  return {
    projects: {
      project1: {
        name: `Project_${faker.string.alphanumeric(5).toUpperCase()}`,
        description: faker.lorem.sentence(),
        createdDate: faker.date.recent().toISOString()
      }
    },
    worksheets: {
      worksheet1: {
        name: `${faker.lorem.word()}_sheet`,
        description: faker.lorem.sentence(),
        createdDate: faker.date.recent().toISOString()
      }
    },
    parameterGroups: {
      pg1: {
        name: `pg_${faker.string.alphanumeric(3).toLowerCase()}`,
        description: faker.lorem.sentence(),
        parameters: faker.number.int({ min: 1, max: 10 })
      }
    }
  };
}

// Generate user-specific data
function generateUserData() {
  return {
    users: {
      user1: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: faker.person.jobType(),
        department: faker.commerce.department()
      }
    }
  };
}

// Generate complete test data (all types)
function generateAllTestData() {
  return {
    ...generateTaskData(),
    ...generateProjectData(),
    ...generateUserData()
  };
}

// Read existing testdata.json
function readExistingTestData() {
  try {
    const filePath = path.join(__dirname, 'testdata.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return {};
  } catch (error) {
    console.error('Error reading existing test data:', error.message);
    return {};
  }
}

// Update specific data type in testdata.json
function updateSpecificDataType(dataType) {
  try {
    const existingData = readExistingTestData();
    let newData;

    switch (dataType.toLowerCase()) {
      case 'task':
      case 'tasks':
        newData = generateTaskData();
        break;
      case 'project':
      case 'projects':
        newData = generateProjectData();
        break;
      case 'user':
      case 'users':
        newData = generateUserData();
        break;
      case 'all':
        newData = generateAllTestData();
        break;
      default:
        throw new Error(`Unknown data type: ${dataType}. Use 'task', 'project', 'user', or 'all'`);
    }

    // Merge with existing data (preserve other types)
    const updatedData = { ...existingData, ...newData };
    
    // Write to file
    const filePath = path.join(__dirname, 'testdata.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    
    console.log(`✅ ${dataType} data successfully generated and saved to testdata.json`);
    console.log('📊 Generated data summary:');
    Object.keys(newData).forEach(key => {
      if (typeof newData[key] === 'object' && !Array.isArray(newData[key])) {
        console.log(`   - ${key}: ${Object.keys(newData[key]).length} items`);
      }
    });
    
    return updatedData;
  } catch (error) {
    console.error('❌ Error generating test data:', error.message);
    return null;
  }
}

// Generate specific data type (for programmatic use)
function generateSpecificData(type, identifier) {
  const fakerGenerators = {
    project: () => ({
      name: `Project_${faker.string.alphanumeric(5).toUpperCase()}`,
      description: faker.lorem.sentence(),
      createdDate: faker.date.recent().toISOString()
    }),
    task: () => ({
      name: faker.lorem.words(3),
      priority: faker.number.int({ min: 1, max: 100 }).toString(),
      description: faker.lorem.paragraph(),
      assignee: faker.internet.email(),
      dueDate: faker.date.future().toISOString()
    }),
    worksheet: () => ({
      name: `${faker.lorem.word()}_sheet`,
      description: faker.lorem.sentence(),
      createdDate: faker.date.recent().toISOString()
    }),
    user: () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.person.jobType(),
      department: faker.commerce.department()
    })
  };

  if (fakerGenerators[type]) {
    return fakerGenerators[type]();
  } else {
    throw new Error(`Unknown data type: ${type}`);
  }
}

// Export functions for use in other files
module.exports = {
  generateTaskData,
  generateProjectData,
  generateUserData,
  generateAllTestData,
  updateSpecificDataType,
  generateSpecificData
};

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const dataType = args[0] || 'all';
  
  console.log(`🎲 Generating ${dataType} data...`);
  updateSpecificDataType(dataType);
}
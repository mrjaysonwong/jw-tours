import { v4 as uuidv4 } from 'uuid';

export const randomUsers = {
  users: [
    {
      _id: uuidv4(),
      firstName: 'Sarah',
      lastName: 'Fisher',
      email: [
        {
          email: 'sarah.fisher@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'sarah74@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Anthony',
      lastName: 'Anderson',
      email: [
        {
          email: 'anthony.anderson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'anthony15@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Peter',
      lastName: 'Reed',
      email: [
        {
          email: 'peter.reed@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'peter76@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Veronica',
      lastName: 'Smith',
      email: [
        {
          email: 'veronica.smith@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'veronica30@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Benjamin',
      lastName: 'Charles',
      email: [
        {
          email: 'benjamin.charles@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'benjamin7@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Dylan',
      lastName: 'Faulkner',
      email: [
        {
          email: 'dylan.faulkner@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'dylan10@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Steven',
      lastName: 'Santiago',
      email: [
        {
          email: 'steven.santiago@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'steven70@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Douglas',
      lastName: 'Meyer',
      email: [
        {
          email: 'douglas.meyer@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'douglas58@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Victoria',
      lastName: 'Shaw',
      email: [
        {
          email: 'victoria.shaw@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'victoria40@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Nathan',
      lastName: 'Davis',
      email: [
        {
          email: 'nathan.davis@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'nathan70@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Heidi',
      lastName: 'Lewis',
      email: [
        {
          email: 'heidi.lewis@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'heidi4@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Schneider',
      email: [
        {
          email: 'michael.schneider@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'michael2@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Joshua',
      lastName: 'Hull',
      email: [
        {
          email: 'joshua.hull@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joshua26@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Brian',
      lastName: 'Wilson',
      email: [
        {
          email: 'brian.wilson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'brian59@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Denise',
      lastName: 'White',
      email: [
        {
          email: 'denise.white@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'denise45@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Tim',
      lastName: 'Shields',
      email: [
        {
          email: 'tim.shields@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'tim89@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Erik',
      lastName: 'Lee',
      email: [
        {
          email: 'erik.lee@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'erik92@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Crystal',
      lastName: 'Mcintyre',
      email: [
        {
          email: 'crystal.mcintyre@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'crystal60@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Melissa',
      lastName: 'Diaz',
      email: [
        {
          email: 'melissa.diaz@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'melissa93@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Moreno',
      email: [
        {
          email: 'michael.moreno@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'michael61@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Joseph',
      lastName: 'Dalton',
      email: [
        {
          email: 'joseph.dalton@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joseph2@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeffrey',
      lastName: 'Berry',
      email: [
        {
          email: 'jeffrey.berry@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jeffrey64@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jamie',
      lastName: 'Johnson',
      email: [
        {
          email: 'jamie.johnson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jamie11@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Gary',
      lastName: 'Knight',
      email: [
        {
          email: 'gary.knight@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'gary5@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Dean',
      lastName: 'Smith',
      email: [
        {
          email: 'dean.smith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'dean10@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Charles',
      lastName: 'Reyes',
      email: [
        {
          email: 'charles.reyes@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'charles13@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Patrick',
      lastName: 'Carr',
      email: [
        {
          email: 'patrick.carr@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'patrick25@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Krista',
      lastName: 'Schneider',
      email: [
        {
          email: 'krista.schneider@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'krista33@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Gary',
      lastName: 'Horne',
      email: [
        {
          email: 'gary.horne@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'gary18@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Andrea',
      lastName: 'Martin',
      email: [
        {
          email: 'andrea.martin@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'andrea95@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Zachary',
      lastName: 'Spencer',
      email: [
        {
          email: 'zachary.spencer@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'zachary80@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Isaac',
      lastName: 'Roman',
      email: [
        {
          email: 'isaac.roman@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'isaac82@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Ashley',
      lastName: 'Adams',
      email: [
        {
          email: 'ashley.adams@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'ashley54@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Stephen',
      lastName: 'Phillips',
      email: [
        {
          email: 'stephen.phillips@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'stephen64@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Laura',
      lastName: 'Russo',
      email: [
        {
          email: 'laura.russo@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'laura19@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Nicole',
      lastName: 'Simon',
      email: [
        {
          email: 'nicole.simon@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'nicole96@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Anna',
      lastName: 'Hudson',
      email: [
        {
          email: 'anna.hudson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'anna67@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Robert',
      lastName: 'Spence',
      email: [
        {
          email: 'robert.spence@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'robert2@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Theresa',
      lastName: 'Evans',
      email: [
        {
          email: 'theresa.evans@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'theresa72@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Theresa',
      lastName: 'Manning',
      email: [
        {
          email: 'theresa.manning@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'theresa14@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Matthew',
      lastName: 'Yang',
      email: [
        {
          email: 'matthew.yang@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'matthew99@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Joseph',
      lastName: 'Caldwell',
      email: [
        {
          email: 'joseph.caldwell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joseph33@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Lisa',
      lastName: 'Roberts',
      email: [
        {
          email: 'lisa.roberts@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'lisa29@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Harris',
      email: [
        {
          email: 'michael.harris@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'michael14@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Ronald',
      lastName: 'Miller',
      email: [
        {
          email: 'ronald.miller@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'ronald60@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Adam',
      lastName: 'Pineda',
      email: [
        {
          email: 'adam.pineda@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'adam97@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Gary',
      lastName: 'Woods',
      email: [
        {
          email: 'gary.woods@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'gary2@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Peterson',
      email: [
        {
          email: 'michael.peterson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'michael72@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Ryan',
      lastName: 'Nguyen',
      email: [
        {
          email: 'ryan.nguyen@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'ryan87@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Holly',
      lastName: 'Hart',
      email: [
        {
          email: 'holly.hart@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'holly4@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Mark',
      lastName: 'Gomez',
      email: [
        {
          email: 'mark.gomez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'mark52@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Justin',
      lastName: 'Diaz',
      email: [
        {
          email: 'justin.diaz@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'justin39@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Rachel',
      lastName: 'Crawford',
      email: [
        {
          email: 'rachel.crawford@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'rachel36@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Janice',
      lastName: 'Best',
      email: [
        {
          email: 'janice.best@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'janice82@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'James',
      lastName: 'Baker',
      email: [
        {
          email: 'james.baker@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'james50@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeff',
      lastName: 'Jenkins',
      email: [
        {
          email: 'jeff.jenkins@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jeff86@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Matthew',
      lastName: 'Bryant',
      email: [
        {
          email: 'matthew.bryant@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'matthew48@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Kenneth',
      lastName: 'Miller',
      email: [
        {
          email: 'kenneth.miller@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kenneth38@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Mitchell',
      lastName: 'Sloan',
      email: [
        {
          email: 'mitchell.sloan@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'mitchell11@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jessica',
      lastName: 'Pham',
      email: [
        {
          email: 'jessica.pham@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jessica49@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Nicholas',
      lastName: 'Mitchell',
      email: [
        {
          email: 'nicholas.mitchell@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'nicholas2@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Brian',
      lastName: 'Baker',
      email: [
        {
          email: 'brian.baker@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'brian55@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Peter',
      lastName: 'Burns',
      email: [
        {
          email: 'peter.burns@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'peter66@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Vanessa',
      lastName: 'Brown',
      email: [
        {
          email: 'vanessa.brown@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'vanessa51@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Paul',
      lastName: 'Monroe',
      email: [
        {
          email: 'paul.monroe@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'paul6@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Shawn',
      lastName: 'Jordan',
      email: [
        {
          email: 'shawn.jordan@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'shawn11@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeffery',
      lastName: 'Hall',
      email: [
        {
          email: 'jeffery.hall@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jeffery5@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Cathy',
      lastName: 'Mcbride',
      email: [
        {
          email: 'cathy.mcbride@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'cathy73@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jonathan',
      lastName: 'Conley',
      email: [
        {
          email: 'jonathan.conley@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jonathan30@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Krista',
      lastName: 'Hardin',
      email: [
        {
          email: 'krista.hardin@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'krista73@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Brianna',
      lastName: 'Smith',
      email: [
        {
          email: 'brianna.smith@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brianna24@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Hubbard',
      email: [
        {
          email: 'michael.hubbard@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'michael15@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Alan',
      lastName: 'Williams',
      email: [
        {
          email: 'alan.williams@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'alan83@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Kimberly',
      lastName: 'Davis',
      email: [
        {
          email: 'kimberly.davis@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kimberly18@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Jason',
      lastName: 'Ford',
      email: [
        {
          email: 'jason.ford@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jason5@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Thomas',
      lastName: 'Barnes',
      email: [
        {
          email: 'thomas.barnes@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'thomas92@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Destiny',
      lastName: 'Petersen',
      email: [
        {
          email: 'destiny.petersen@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'destiny34@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Angela',
      lastName: 'Page',
      email: [
        {
          email: 'angela.page@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'angela85@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'April',
      lastName: 'Ritter',
      email: [
        {
          email: 'april.ritter@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'april5@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Amy',
      lastName: 'Marquez',
      email: [
        {
          email: 'amy.marquez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'amy16@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Derek',
      lastName: 'Taylor',
      email: [
        {
          email: 'derek.taylor@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'derek66@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Brian',
      lastName: 'Walsh',
      email: [
        {
          email: 'brian.walsh@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'brian57@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Ricky',
      lastName: 'Payne',
      email: [
        {
          email: 'ricky.payne@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'ricky26@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Crystal',
      lastName: 'Smith',
      email: [
        {
          email: 'crystal.smith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'crystal59@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Seth',
      lastName: 'Jenkins',
      email: [
        {
          email: 'seth.jenkins@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'seth88@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Frank',
      lastName: 'Jones',
      email: [
        {
          email: 'frank.jones@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'frank52@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Erika',
      lastName: 'Patterson',
      email: [
        {
          email: 'erika.patterson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'erika6@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Elizabeth',
      lastName: 'Watkins',
      email: [
        {
          email: 'elizabeth.watkins@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'elizabeth84@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Richard',
      lastName: 'Campos',
      email: [
        {
          email: 'richard.campos@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'richard59@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Elizabeth',
      lastName: 'Hunt',
      email: [
        {
          email: 'elizabeth.hunt@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'elizabeth47@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Robert',
      lastName: 'Phillips',
      email: [
        {
          email: 'robert.phillips@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'robert84@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Andrea',
      lastName: 'Bell',
      email: [
        {
          email: 'andrea.bell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'andrea41@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Tracie',
      lastName: 'Guzman',
      email: [
        {
          email: 'tracie.guzman@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'tracie59@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Theresa',
      lastName: 'Avery',
      email: [
        {
          email: 'theresa.avery@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'theresa43@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Cassandra',
      lastName: 'Short',
      email: [
        {
          email: 'cassandra.short@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'cassandra98@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Jessica',
      lastName: 'White',
      email: [
        {
          email: 'jessica.white@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jessica31@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Zachary',
      lastName: 'Brandt',
      email: [
        {
          email: 'zachary.brandt@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'zachary7@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Marissa',
      lastName: 'Gomez',
      email: [
        {
          email: 'marissa.gomez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'marissa48@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Lori',
      lastName: 'Wright',
      email: [
        {
          email: 'lori.wright@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'lori24@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Brian',
      lastName: 'Summers',
      email: [
        {
          email: 'brian.summers@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brian15@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Christine',
      lastName: 'Morales',
      email: [
        {
          email: 'christine.morales@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christine33@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Ashley',
      lastName: 'Nunez',
      email: [
        {
          email: 'ashley.nunez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'ashley68@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Charles',
      lastName: 'Rollins',
      email: [
        {
          email: 'charles.rollins@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'charles65@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Kathy',
      lastName: 'Woods',
      email: [
        {
          email: 'kathy.woods@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kathy8@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Leslie',
      lastName: 'Simmons',
      email: [
        {
          email: 'leslie.simmons@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'leslie89@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Carla',
      lastName: 'Smith',
      email: [
        {
          email: 'carla.smith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'carla35@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Olivia',
      lastName: 'Kemp',
      email: [
        {
          email: 'olivia.kemp@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'olivia31@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Christopher',
      lastName: 'Oneill',
      email: [
        {
          email: 'christopher.oneill@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christopher31@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Tanner',
      email: [
        {
          email: 'amanda.tanner@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'amanda67@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Brent',
      lastName: 'Spears',
      email: [
        {
          email: 'brent.spears@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'brent60@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'James',
      lastName: 'Terrell',
      email: [
        {
          email: 'james.terrell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'james38@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Thomas',
      lastName: 'Jackson',
      email: [
        {
          email: 'thomas.jackson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'thomas91@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Angela',
      lastName: 'Morrow',
      email: [
        {
          email: 'angela.morrow@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'angela93@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Christian',
      lastName: 'Lewis',
      email: [
        {
          email: 'christian.lewis@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christian69@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Powell',
      email: [
        {
          email: 'amanda.powell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'amanda41@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Sarah',
      lastName: 'Kemp',
      email: [
        {
          email: 'sarah.kemp@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'sarah12@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jessica',
      lastName: 'Vasquez',
      email: [
        {
          email: 'jessica.vasquez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jessica28@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Danielle',
      lastName: 'Mercado',
      email: [
        {
          email: 'danielle.mercado@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'danielle20@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Nicholas',
      lastName: 'Scott',
      email: [
        {
          email: 'nicholas.scott@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'nicholas41@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Cynthia',
      lastName: 'Moore',
      email: [
        {
          email: 'cynthia.moore@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'cynthia67@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jennifer',
      lastName: 'Gross',
      email: [
        {
          email: 'jennifer.gross@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jennifer67@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Darren',
      lastName: 'Higgins',
      email: [
        {
          email: 'darren.higgins@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'darren47@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Benjamin',
      lastName: 'Walter',
      email: [
        {
          email: 'benjamin.walter@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'benjamin84@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Todd',
      lastName: 'Barton',
      email: [
        {
          email: 'todd.barton@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'todd91@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeffrey',
      lastName: 'Fox',
      email: [
        {
          email: 'jeffrey.fox@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jeffrey77@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Scott',
      lastName: 'Fernandez',
      email: [
        {
          email: 'scott.fernandez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'scott31@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Robin',
      lastName: 'Clay',
      email: [
        {
          email: 'robin.clay@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'robin69@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Samantha',
      lastName: 'Thompson',
      email: [
        {
          email: 'samantha.thompson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'samantha37@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Brianna',
      lastName: 'Gonzalez',
      email: [
        {
          email: 'brianna.gonzalez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brianna40@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Raymond',
      lastName: 'Jones',
      email: [
        {
          email: 'raymond.jones@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'raymond7@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Brittany',
      lastName: 'Ortiz',
      email: [
        {
          email: 'brittany.ortiz@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'brittany66@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Christopher',
      lastName: 'Dean',
      email: [
        {
          email: 'christopher.dean@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'christopher47@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Howard',
      lastName: 'Cameron',
      email: [
        {
          email: 'howard.cameron@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'howard97@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Monica',
      lastName: 'House',
      email: [
        {
          email: 'monica.house@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'monica92@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Wendy',
      lastName: 'Coffey',
      email: [
        {
          email: 'wendy.coffey@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'wendy73@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Ryan',
      lastName: 'Hooper',
      email: [
        {
          email: 'ryan.hooper@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'ryan31@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Wyatt',
      lastName: 'Powell',
      email: [
        {
          email: 'wyatt.powell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'wyatt30@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Julie',
      lastName: 'Hardy',
      email: [
        {
          email: 'julie.hardy@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'julie73@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Brittany',
      lastName: 'Robbins',
      email: [
        {
          email: 'brittany.robbins@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'brittany26@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jennifer',
      lastName: 'Bolton',
      email: [
        {
          email: 'jennifer.bolton@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jennifer45@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Anthony',
      lastName: 'Ross',
      email: [
        {
          email: 'anthony.ross@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'anthony71@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Robin',
      lastName: 'Sanchez',
      email: [
        {
          email: 'robin.sanchez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'robin11@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Susan',
      lastName: 'Gomez',
      email: [
        {
          email: 'susan.gomez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'susan46@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Kathleen',
      lastName: 'Williams',
      email: [
        {
          email: 'kathleen.williams@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'kathleen65@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Harris',
      email: [
        {
          email: 'michael.harris@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'michael80@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Ebony',
      lastName: 'Ruiz',
      email: [
        {
          email: 'ebony.ruiz@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'ebony76@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Julia',
      lastName: 'Smith',
      email: [
        {
          email: 'julia.smith@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'julia91@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Heather',
      lastName: 'Johnson',
      email: [
        {
          email: 'heather.johnson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'heather41@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Ryan',
      lastName: 'Hunter',
      email: [
        {
          email: 'ryan.hunter@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'ryan51@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Robert',
      lastName: 'Blake',
      email: [
        {
          email: 'robert.blake@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'robert46@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jamie',
      lastName: 'Williams',
      email: [
        {
          email: 'jamie.williams@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jamie32@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Travis',
      lastName: 'Klein',
      email: [
        {
          email: 'travis.klein@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'travis38@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Chad',
      lastName: 'Young',
      email: [
        {
          email: 'chad.young@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'chad70@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jodi',
      lastName: 'Frazier',
      email: [
        {
          email: 'jodi.frazier@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jodi77@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Melissa',
      lastName: 'Walker',
      email: [
        {
          email: 'melissa.walker@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'melissa16@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Karen',
      lastName: 'Aguilar',
      email: [
        {
          email: 'karen.aguilar@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'karen18@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Richard',
      lastName: 'Hardin',
      email: [
        {
          email: 'richard.hardin@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'richard41@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Francisco',
      lastName: 'Reynolds',
      email: [
        {
          email: 'francisco.reynolds@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'francisco21@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Kristina',
      lastName: 'Johnson',
      email: [
        {
          email: 'kristina.johnson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kristina75@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Lauren',
      lastName: 'Fox',
      email: [
        {
          email: 'lauren.fox@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'lauren57@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Medina',
      email: [
        {
          email: 'david.medina@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'david52@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Warren',
      lastName: 'Lane',
      email: [
        {
          email: 'warren.lane@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'warren70@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Nicholas',
      lastName: 'Rojas',
      email: [
        {
          email: 'nicholas.rojas@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'nicholas9@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Kelly',
      lastName: 'Harrington',
      email: [
        {
          email: 'kelly.harrington@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kelly17@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Debra',
      lastName: 'Johnson',
      email: [
        {
          email: 'debra.johnson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'debra50@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Carolyn',
      lastName: 'Hodges',
      email: [
        {
          email: 'carolyn.hodges@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'carolyn14@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Cheryl',
      lastName: 'Anderson',
      email: [
        {
          email: 'cheryl.anderson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'cheryl93@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Kimberly',
      lastName: 'Gonzalez',
      email: [
        {
          email: 'kimberly.gonzalez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'kimberly54@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Elaine',
      lastName: 'Smith',
      email: [
        {
          email: 'elaine.smith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'elaine22@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Melanie',
      lastName: 'Humphrey',
      email: [
        {
          email: 'melanie.humphrey@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'melanie47@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Dalton',
      lastName: 'Diaz',
      email: [
        {
          email: 'dalton.diaz@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'dalton1@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Mary',
      lastName: 'Wright',
      email: [
        {
          email: 'mary.wright@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'mary50@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Nicole',
      lastName: 'Davis',
      email: [
        {
          email: 'nicole.davis@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'nicole94@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Barbara',
      lastName: 'Williamson',
      email: [
        {
          email: 'barbara.williamson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'barbara13@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Richard',
      lastName: 'Duncan',
      email: [
        {
          email: 'richard.duncan@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'richard10@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Paul',
      lastName: 'Keller',
      email: [
        {
          email: 'paul.keller@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'paul83@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Kim',
      lastName: 'Keith',
      email: [
        {
          email: 'kim.keith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'kim61@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Meyer',
      email: [
        {
          email: 'david.meyer@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'david33@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Sandra',
      lastName: 'Snyder',
      email: [
        {
          email: 'sandra.snyder@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'sandra91@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Clarence',
      lastName: 'Hernandez',
      email: [
        {
          email: 'clarence.hernandez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'clarence95@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Christine',
      lastName: 'Krause',
      email: [
        {
          email: 'christine.krause@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christine1@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Brian',
      lastName: 'Anderson',
      email: [
        {
          email: 'brian.anderson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brian40@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Alexis',
      lastName: 'Paul',
      email: [
        {
          email: 'alexis.paul@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'alexis71@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Michelle',
      lastName: 'Mcdaniel',
      email: [
        {
          email: 'michelle.mcdaniel@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'michelle30@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Daniel',
      lastName: 'Gutierrez',
      email: [
        {
          email: 'daniel.gutierrez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'daniel45@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Edward',
      lastName: 'Perez',
      email: [
        {
          email: 'edward.perez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'edward84@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Paula',
      lastName: 'Morales',
      email: [
        {
          email: 'paula.morales@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'paula94@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Lisa',
      lastName: 'Blevins',
      email: [
        {
          email: 'lisa.blevins@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'lisa32@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Susan',
      lastName: 'Sanders',
      email: [
        {
          email: 'susan.sanders@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'susan99@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Christine',
      lastName: 'Lawrence',
      email: [
        {
          email: 'christine.lawrence@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'christine95@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Phillips',
      email: [
        {
          email: 'michael.phillips@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'michael95@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Katherine',
      lastName: 'Owens',
      email: [
        {
          email: 'katherine.owens@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'katherine32@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Savannah',
      lastName: 'Heath',
      email: [
        {
          email: 'savannah.heath@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'savannah46@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Zachary',
      lastName: 'Wilson',
      email: [
        {
          email: 'zachary.wilson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'zachary75@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Francisco',
      lastName: 'Cohen',
      email: [
        {
          email: 'francisco.cohen@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'francisco88@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'James',
      lastName: 'Morrison',
      email: [
        {
          email: 'james.morrison@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'james35@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Kelly',
      lastName: 'Flowers',
      email: [
        {
          email: 'kelly.flowers@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kelly69@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Bailey',
      lastName: 'Mcdonald',
      email: [
        {
          email: 'bailey.mcdonald@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'bailey66@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Christian',
      lastName: 'Obrien',
      email: [
        {
          email: 'christian.obrien@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christian43@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Danielle',
      lastName: 'Jenkins',
      email: [
        {
          email: 'danielle.jenkins@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'danielle68@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Marie',
      lastName: 'Fox',
      email: [
        {
          email: 'marie.fox@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'marie94@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Bryan',
      lastName: 'Hale',
      email: [
        {
          email: 'bryan.hale@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'bryan20@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Mary',
      lastName: 'Cox',
      email: [
        {
          email: 'mary.cox@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'mary35@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Kenneth',
      lastName: 'Barrera',
      email: [
        {
          email: 'kenneth.barrera@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'kenneth55@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeremy',
      lastName: 'Oneal',
      email: [
        {
          email: 'jeremy.oneal@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jeremy31@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Peter',
      lastName: 'White',
      email: [
        {
          email: 'peter.white@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'peter72@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jacob',
      lastName: 'Pearson',
      email: [
        {
          email: 'jacob.pearson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jacob93@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Travis',
      lastName: 'Cox',
      email: [
        {
          email: 'travis.cox@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'travis73@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Wyatt',
      lastName: 'Wheeler',
      email: [
        {
          email: 'wyatt.wheeler@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'wyatt22@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jacob',
      lastName: 'Wright',
      email: [
        {
          email: 'jacob.wright@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jacob93@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Phillip',
      lastName: 'Navarro',
      email: [
        {
          email: 'phillip.navarro@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'phillip7@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Brittany',
      lastName: 'Moore',
      email: [
        {
          email: 'brittany.moore@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brittany14@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Joy',
      lastName: 'Herman',
      email: [
        {
          email: 'joy.herman@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'joy80@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Kaitlin',
      lastName: 'Case',
      email: [
        {
          email: 'kaitlin.case@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'kaitlin4@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Alan',
      lastName: 'Brown',
      email: [
        {
          email: 'alan.brown@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'alan19@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Christine',
      lastName: 'Campbell',
      email: [
        {
          email: 'christine.campbell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christine70@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Sandra',
      lastName: 'Rivas',
      email: [
        {
          email: 'sandra.rivas@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'sandra82@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Dominic',
      lastName: 'Lopez',
      email: [
        {
          email: 'dominic.lopez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'dominic54@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Shawn',
      lastName: 'Nelson',
      email: [
        {
          email: 'shawn.nelson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'shawn69@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Robert',
      lastName: 'Bailey',
      email: [
        {
          email: 'robert.bailey@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'robert86@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Alexis',
      lastName: 'Walls',
      email: [
        {
          email: 'alexis.walls@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'alexis27@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Doris',
      lastName: 'Johnson',
      email: [
        {
          email: 'doris.johnson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'doris90@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Timothy',
      lastName: 'Logan',
      email: [
        {
          email: 'timothy.logan@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'timothy13@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Denise',
      lastName: 'Jones',
      email: [
        {
          email: 'denise.jones@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'denise52@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Emily',
      lastName: 'Munoz',
      email: [
        {
          email: 'emily.munoz@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'emily7@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Elliott',
      email: [
        {
          email: 'amanda.elliott@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'amanda93@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Julie',
      lastName: 'Mitchell',
      email: [
        {
          email: 'julie.mitchell@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'julie18@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Armstrong',
      email: [
        {
          email: 'michael.armstrong@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'michael40@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Tara',
      lastName: 'Young',
      email: [
        {
          email: 'tara.young@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'tara47@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Richard',
      lastName: 'Willis',
      email: [
        {
          email: 'richard.willis@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'richard55@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Aaron',
      lastName: 'Smith',
      email: [
        {
          email: 'aaron.smith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'aaron7@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Nancy',
      lastName: 'Bishop',
      email: [
        {
          email: 'nancy.bishop@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'nancy93@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Armstrong',
      email: [
        {
          email: 'david.armstrong@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'david55@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Graves',
      email: [
        {
          email: 'michael.graves@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'michael48@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Jacob',
      lastName: 'Rios',
      email: [
        {
          email: 'jacob.rios@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jacob85@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Brittany',
      lastName: 'Brown',
      email: [
        {
          email: 'brittany.brown@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brittany21@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Edward',
      lastName: 'Jackson',
      email: [
        {
          email: 'edward.jackson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'edward80@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeffrey',
      lastName: 'Harris',
      email: [
        {
          email: 'jeffrey.harris@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jeffrey70@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jerry',
      lastName: 'Mcconnell',
      email: [
        {
          email: 'jerry.mcconnell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jerry23@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Gilbert',
      email: [
        {
          email: 'amanda.gilbert@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'amanda42@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Bailey',
      lastName: 'Reynolds',
      email: [
        {
          email: 'bailey.reynolds@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'bailey51@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jay',
      lastName: 'Lawson',
      email: [
        {
          email: 'jay.lawson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jay27@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Christine',
      lastName: 'Guzman',
      email: [
        {
          email: 'christine.guzman@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christine34@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Kevin',
      lastName: 'Mahoney',
      email: [
        {
          email: 'kevin.mahoney@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kevin22@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jessica',
      lastName: 'Alexander',
      email: [
        {
          email: 'jessica.alexander@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jessica78@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Patricia',
      lastName: 'Moore',
      email: [
        {
          email: 'patricia.moore@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'patricia28@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Sarah',
      lastName: 'Torres',
      email: [
        {
          email: 'sarah.torres@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'sarah59@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jack',
      lastName: 'Stanton',
      email: [
        {
          email: 'jack.stanton@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jack41@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'William',
      lastName: 'Scott',
      email: [
        {
          email: 'william.scott@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'william78@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Vincent',
      lastName: 'Martinez',
      email: [
        {
          email: 'vincent.martinez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'vincent96@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'William',
      lastName: 'Fletcher',
      email: [
        {
          email: 'william.fletcher@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'william37@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Timothy',
      lastName: 'Kelly',
      email: [
        {
          email: 'timothy.kelly@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'timothy75@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Tonya',
      lastName: 'Curtis',
      email: [
        {
          email: 'tonya.curtis@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'tonya35@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Vincent',
      lastName: 'Wiley',
      email: [
        {
          email: 'vincent.wiley@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'vincent24@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Tracy',
      lastName: 'Fox',
      email: [
        {
          email: 'tracy.fox@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'tracy43@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Sara',
      lastName: 'Moore',
      email: [
        {
          email: 'sara.moore@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'sara69@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Natalie',
      lastName: 'Taylor',
      email: [
        {
          email: 'natalie.taylor@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'natalie69@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Patricia',
      lastName: 'Jones',
      email: [
        {
          email: 'patricia.jones@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'patricia73@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'James',
      lastName: 'Rodriguez',
      email: [
        {
          email: 'james.rodriguez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'james17@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Debbie',
      lastName: 'Patterson',
      email: [
        {
          email: 'debbie.patterson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'debbie92@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Emily',
      lastName: 'Morris',
      email: [
        {
          email: 'emily.morris@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'emily40@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Richard',
      lastName: 'Hodges',
      email: [
        {
          email: 'richard.hodges@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'richard97@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Tracy',
      lastName: 'Garcia',
      email: [
        {
          email: 'tracy.garcia@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'tracy25@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'John',
      lastName: 'Bradley',
      email: [
        {
          email: 'john.bradley@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'john43@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Natalie',
      lastName: 'May',
      email: [
        {
          email: 'natalie.may@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'natalie40@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Erika',
      lastName: 'Bush',
      email: [
        {
          email: 'erika.bush@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'erika58@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Susan',
      lastName: 'Nguyen',
      email: [
        {
          email: 'susan.nguyen@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'susan98@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Eric',
      lastName: 'Powell',
      email: [
        {
          email: 'eric.powell@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'eric56@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Alexis',
      lastName: 'Jordan',
      email: [
        {
          email: 'alexis.jordan@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'alexis95@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeffrey',
      lastName: 'Crawford',
      email: [
        {
          email: 'jeffrey.crawford@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jeffrey12@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Joshua',
      lastName: 'Martin',
      email: [
        {
          email: 'joshua.martin@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joshua55@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Pamela',
      lastName: 'Greer',
      email: [
        {
          email: 'pamela.greer@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'pamela97@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Samantha',
      lastName: 'Ruiz',
      email: [
        {
          email: 'samantha.ruiz@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'samantha95@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Marie',
      lastName: 'Reid',
      email: [
        {
          email: 'marie.reid@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'marie93@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Holt',
      email: [
        {
          email: 'amanda.holt@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'amanda25@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Tonya',
      lastName: 'Ramirez',
      email: [
        {
          email: 'tonya.ramirez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'tonya49@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Gregory',
      lastName: 'Barrera',
      email: [
        {
          email: 'gregory.barrera@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'gregory69@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Paul',
      lastName: 'Adkins',
      email: [
        {
          email: 'paul.adkins@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'paul81@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Nicole',
      lastName: 'Lopez',
      email: [
        {
          email: 'nicole.lopez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'nicole60@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Kimberly',
      lastName: 'Downs',
      email: [
        {
          email: 'kimberly.downs@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kimberly36@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Amy',
      lastName: 'Weaver',
      email: [
        {
          email: 'amy.weaver@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'amy16@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Steven',
      lastName: 'Elliott',
      email: [
        {
          email: 'steven.elliott@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'steven5@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Cassandra',
      lastName: 'Fowler',
      email: [
        {
          email: 'cassandra.fowler@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'cassandra26@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Christopher',
      lastName: 'Lowery',
      email: [
        {
          email: 'christopher.lowery@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christopher14@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Darlene',
      lastName: 'Wilson',
      email: [
        {
          email: 'darlene.wilson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'darlene89@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'John',
      lastName: 'Hernandez',
      email: [
        {
          email: 'john.hernandez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'john51@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Rebecca',
      lastName: 'Perry',
      email: [
        {
          email: 'rebecca.perry@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'rebecca95@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Savannah',
      lastName: 'Rose',
      email: [
        {
          email: 'savannah.rose@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'savannah25@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Casey',
      lastName: 'Jennings',
      email: [
        {
          email: 'casey.jennings@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'casey66@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'William',
      lastName: 'Mack',
      email: [
        {
          email: 'william.mack@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'william68@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Corey',
      lastName: 'Francis',
      email: [
        {
          email: 'corey.francis@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'corey78@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Little',
      email: [
        {
          email: 'david.little@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'david78@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Diana',
      lastName: 'Berg',
      email: [
        {
          email: 'diana.berg@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'diana82@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Lauren',
      lastName: 'Roth',
      email: [
        {
          email: 'lauren.roth@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'lauren83@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Christina',
      lastName: 'Simpson',
      email: [
        {
          email: 'christina.simpson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'christina86@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Katrina',
      lastName: 'Moore',
      email: [
        {
          email: 'katrina.moore@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'katrina16@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'John',
      lastName: 'Harris',
      email: [
        {
          email: 'john.harris@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'john28@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Andrew',
      lastName: 'Mahoney',
      email: [
        {
          email: 'andrew.mahoney@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'andrew86@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Helen',
      lastName: 'Love',
      email: [
        {
          email: 'helen.love@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'helen62@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Peter',
      lastName: 'Green',
      email: [
        {
          email: 'peter.green@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'peter11@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Kevin',
      lastName: 'Hardin',
      email: [
        {
          email: 'kevin.hardin@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kevin15@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Anthony',
      lastName: 'Reynolds',
      email: [
        {
          email: 'anthony.reynolds@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'anthony40@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Joann',
      lastName: 'Romero',
      email: [
        {
          email: 'joann.romero@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joann31@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'James',
      lastName: 'Olson',
      email: [
        {
          email: 'james.olson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'james38@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jacob',
      lastName: 'Rogers',
      email: [
        {
          email: 'jacob.rogers@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jacob71@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Deborah',
      lastName: 'Lane',
      email: [
        {
          email: 'deborah.lane@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'deborah55@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Megan',
      lastName: 'Ferrell',
      email: [
        {
          email: 'megan.ferrell@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'megan71@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Keith',
      lastName: 'Jimenez',
      email: [
        {
          email: 'keith.jimenez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'keith30@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Deanna',
      lastName: 'Fisher',
      email: [
        {
          email: 'deanna.fisher@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'deanna23@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'William',
      lastName: 'Coleman',
      email: [
        {
          email: 'william.coleman@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'william53@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Nicole',
      lastName: 'Hale',
      email: [
        {
          email: 'nicole.hale@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'nicole87@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Darlene',
      lastName: 'Smith',
      email: [
        {
          email: 'darlene.smith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'darlene76@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Anita',
      lastName: 'Grant',
      email: [
        {
          email: 'anita.grant@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'anita56@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Laura',
      lastName: 'Arnold',
      email: [
        {
          email: 'laura.arnold@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'laura81@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Katrina',
      lastName: 'Campbell',
      email: [
        {
          email: 'katrina.campbell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'katrina58@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Julie',
      lastName: 'Jimenez',
      email: [
        {
          email: 'julie.jimenez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'julie44@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Donna',
      lastName: 'Christensen',
      email: [
        {
          email: 'donna.christensen@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'donna38@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Amy',
      lastName: 'Jackson',
      email: [
        {
          email: 'amy.jackson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'amy26@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Kristine',
      lastName: 'Hodge',
      email: [
        {
          email: 'kristine.hodge@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kristine19@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeremiah',
      lastName: 'Wolf',
      email: [
        {
          email: 'jeremiah.wolf@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jeremiah91@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jean',
      lastName: 'Meyer',
      email: [
        {
          email: 'jean.meyer@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jean72@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Andrew',
      lastName: 'Floyd',
      email: [
        {
          email: 'andrew.floyd@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'andrew14@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Johnny',
      lastName: 'Logan',
      email: [
        {
          email: 'johnny.logan@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'johnny32@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Aaron',
      lastName: 'Mckee',
      email: [
        {
          email: 'aaron.mckee@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'aaron23@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Paul',
      lastName: 'Howard',
      email: [
        {
          email: 'paul.howard@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'paul73@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'John',
      lastName: 'Clark',
      email: [
        {
          email: 'john.clark@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'john32@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Amy',
      lastName: 'Fuller',
      email: [
        {
          email: 'amy.fuller@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'amy51@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Freeman',
      email: [
        {
          email: 'david.freeman@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'david56@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Scott',
      lastName: 'Johnson',
      email: [
        {
          email: 'scott.johnson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'scott90@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Lisa',
      lastName: 'Klein',
      email: [
        {
          email: 'lisa.klein@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'lisa53@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Trevor',
      lastName: 'Wagner',
      email: [
        {
          email: 'trevor.wagner@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'trevor55@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Alexander',
      email: [
        {
          email: 'michael.alexander@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'michael10@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jody',
      lastName: 'Nelson',
      email: [
        {
          email: 'jody.nelson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jody8@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Stephanie',
      lastName: 'Stout',
      email: [
        {
          email: 'stephanie.stout@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'stephanie18@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Scott',
      lastName: 'Diaz',
      email: [
        {
          email: 'scott.diaz@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'scott60@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Andrew',
      lastName: 'Evans',
      email: [
        {
          email: 'andrew.evans@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'andrew41@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Troy',
      lastName: 'Campbell',
      email: [
        {
          email: 'troy.campbell@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'troy53@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Randy',
      lastName: 'Howard',
      email: [
        {
          email: 'randy.howard@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'randy19@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Pamela',
      lastName: 'Smith',
      email: [
        {
          email: 'pamela.smith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'pamela33@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Laura',
      lastName: 'Trevino',
      email: [
        {
          email: 'laura.trevino@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'laura6@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Robert',
      lastName: 'Peterson',
      email: [
        {
          email: 'robert.peterson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'robert10@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Justin',
      lastName: 'Sanchez',
      email: [
        {
          email: 'justin.sanchez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'justin89@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Paul',
      lastName: 'Aguirre',
      email: [
        {
          email: 'paul.aguirre@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'paul3@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Tina',
      lastName: 'Clark',
      email: [
        {
          email: 'tina.clark@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'tina28@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Katherine',
      lastName: 'Campbell',
      email: [
        {
          email: 'katherine.campbell@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'katherine42@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Parker',
      email: [
        {
          email: 'david.parker@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'david37@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Ashley',
      lastName: 'Wright',
      email: [
        {
          email: 'ashley.wright@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'ashley4@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'George',
      lastName: 'Norman',
      email: [
        {
          email: 'george.norman@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'george92@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Alexander',
      lastName: 'Peters',
      email: [
        {
          email: 'alexander.peters@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'alexander21@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Karen',
      lastName: 'Martin',
      email: [
        {
          email: 'karen.martin@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'karen71@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'James',
      lastName: 'Hoffman',
      email: [
        {
          email: 'james.hoffman@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'james33@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Singh',
      email: [
        {
          email: 'amanda.singh@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'amanda75@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Gary',
      lastName: 'Reeves',
      email: [
        {
          email: 'gary.reeves@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'gary44@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Mark',
      lastName: 'Lopez',
      email: [
        {
          email: 'mark.lopez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'mark27@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Holly',
      lastName: 'Larson',
      email: [
        {
          email: 'holly.larson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'holly17@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Phillip',
      lastName: 'Christensen',
      email: [
        {
          email: 'phillip.christensen@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'phillip11@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Price',
      email: [
        {
          email: 'david.price@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'david90@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Eugene',
      lastName: 'Jones',
      email: [
        {
          email: 'eugene.jones@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'eugene66@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'John',
      lastName: 'Contreras',
      email: [
        {
          email: 'john.contreras@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'john17@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Ryan',
      lastName: 'Brown',
      email: [
        {
          email: 'ryan.brown@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'ryan65@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jonathan',
      lastName: 'Arnold',
      email: [
        {
          email: 'jonathan.arnold@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jonathan94@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Joseph',
      lastName: 'Miller',
      email: [
        {
          email: 'joseph.miller@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joseph19@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Christopher',
      lastName: 'Lang',
      email: [
        {
          email: 'christopher.lang@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'christopher35@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Morgan',
      lastName: 'Wilson',
      email: [
        {
          email: 'morgan.wilson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'morgan91@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Shane',
      lastName: 'Cooper',
      email: [
        {
          email: 'shane.cooper@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'shane20@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Tyler',
      lastName: 'Bradford',
      email: [
        {
          email: 'tyler.bradford@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'tyler12@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Palmer',
      email: [
        {
          email: 'david.palmer@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'david12@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Crystal',
      lastName: 'Frank',
      email: [
        {
          email: 'crystal.frank@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'crystal13@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Andrew',
      lastName: 'Hancock',
      email: [
        {
          email: 'andrew.hancock@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'andrew39@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Kristen',
      lastName: 'Nash',
      email: [
        {
          email: 'kristen.nash@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kristen93@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Smith',
      email: [
        {
          email: 'michael.smith@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'michael76@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Laura',
      lastName: 'Lewis',
      email: [
        {
          email: 'laura.lewis@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'laura42@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Theresa',
      lastName: 'Graham',
      email: [
        {
          email: 'theresa.graham@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'theresa55@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Keith',
      lastName: 'Moyer',
      email: [
        {
          email: 'keith.moyer@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'keith82@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Kim',
      lastName: 'Warren',
      email: [
        {
          email: 'kim.warren@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kim9@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Denise',
      lastName: 'Morales',
      email: [
        {
          email: 'denise.morales@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'denise79@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Paul',
      lastName: 'Rodriguez',
      email: [
        {
          email: 'paul.rodriguez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'paul2@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Christina',
      lastName: 'Anderson',
      email: [
        {
          email: 'christina.anderson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'christina25@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Kelly',
      lastName: 'Terry',
      email: [
        {
          email: 'kelly.terry@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'kelly87@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jesse',
      lastName: 'Nunez',
      email: [
        {
          email: 'jesse.nunez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jesse53@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Jacqueline',
      lastName: 'Newman',
      email: [
        {
          email: 'jacqueline.newman@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jacqueline51@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Christian',
      lastName: 'Taylor',
      email: [
        {
          email: 'christian.taylor@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'christian91@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Amy',
      lastName: 'Rhodes',
      email: [
        {
          email: 'amy.rhodes@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'amy93@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'John',
      lastName: 'Moore',
      email: [
        {
          email: 'john.moore@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'john5@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Amy',
      lastName: 'Daniels',
      email: [
        {
          email: 'amy.daniels@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'amy84@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Joshua',
      lastName: 'Hanson',
      email: [
        {
          email: 'joshua.hanson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'joshua78@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Poole',
      email: [
        {
          email: 'amanda.poole@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'amanda35@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Gregory',
      lastName: 'Burns',
      email: [
        {
          email: 'gregory.burns@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'gregory37@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Ashley',
      lastName: 'Riddle',
      email: [
        {
          email: 'ashley.riddle@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'ashley54@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Julia',
      lastName: 'Lawrence',
      email: [
        {
          email: 'julia.lawrence@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'julia66@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Brian',
      lastName: 'Crawford',
      email: [
        {
          email: 'brian.crawford@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brian20@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Megan',
      lastName: 'Jimenez',
      email: [
        {
          email: 'megan.jimenez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'megan27@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jacqueline',
      lastName: 'Martin',
      email: [
        {
          email: 'jacqueline.martin@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jacqueline14@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Carolyn',
      lastName: 'Douglas',
      email: [
        {
          email: 'carolyn.douglas@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'carolyn89@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Jessica',
      lastName: 'Allen',
      email: [
        {
          email: 'jessica.allen@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jessica60@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Micheal',
      lastName: 'Martin',
      email: [
        {
          email: 'micheal.martin@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'micheal68@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Thomas',
      lastName: 'Torres',
      email: [
        {
          email: 'thomas.torres@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'thomas90@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Patty',
      lastName: 'Peterson',
      email: [
        {
          email: 'patty.peterson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'patty13@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Julie',
      lastName: 'Williams',
      email: [
        {
          email: 'julie.williams@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'julie62@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Andrea',
      lastName: 'Lane',
      email: [
        {
          email: 'andrea.lane@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'andrea62@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Anthony',
      lastName: 'Smith',
      email: [
        {
          email: 'anthony.smith@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'anthony92@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Matthew',
      lastName: 'Ford',
      email: [
        {
          email: 'matthew.ford@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'matthew97@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Kathleen',
      lastName: 'Charles',
      email: [
        {
          email: 'kathleen.charles@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kathleen70@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Lauren',
      lastName: 'Simpson',
      email: [
        {
          email: 'lauren.simpson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'lauren60@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Linda',
      lastName: 'Greer',
      email: [
        {
          email: 'linda.greer@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'linda49@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Patrick',
      lastName: 'Small',
      email: [
        {
          email: 'patrick.small@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'patrick24@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'William',
      lastName: 'Small',
      email: [
        {
          email: 'william.small@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'william68@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Monica',
      lastName: 'James',
      email: [
        {
          email: 'monica.james@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'monica42@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Anthony',
      lastName: 'Stokes',
      email: [
        {
          email: 'anthony.stokes@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'anthony40@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Anthony',
      lastName: 'Davis',
      email: [
        {
          email: 'anthony.davis@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'anthony32@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Cynthia',
      lastName: 'Moore',
      email: [
        {
          email: 'cynthia.moore@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'cynthia74@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Bryan',
      lastName: 'Walker',
      email: [
        {
          email: 'bryan.walker@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'bryan66@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Tyler',
      lastName: 'Ochoa',
      email: [
        {
          email: 'tyler.ochoa@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'tyler55@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Ryan',
      lastName: 'Moreno',
      email: [
        {
          email: 'ryan.moreno@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'ryan76@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Craig',
      lastName: 'Crawford',
      email: [
        {
          email: 'craig.crawford@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'craig58@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Robert',
      lastName: 'Lloyd',
      email: [
        {
          email: 'robert.lloyd@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'robert47@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jennifer',
      lastName: 'Mercer',
      email: [
        {
          email: 'jennifer.mercer@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jennifer10@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Houston',
      email: [
        {
          email: 'amanda.houston@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'amanda30@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Erica',
      lastName: 'Mason',
      email: [
        {
          email: 'erica.mason@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'erica64@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Melissa',
      lastName: 'Wong',
      email: [
        {
          email: 'melissa.wong@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'melissa89@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Karen',
      lastName: 'Hendricks',
      email: [
        {
          email: 'karen.hendricks@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'karen53@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Shelly',
      lastName: 'Hooper',
      email: [
        {
          email: 'shelly.hooper@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'shelly41@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Natasha',
      lastName: 'Sanchez',
      email: [
        {
          email: 'natasha.sanchez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'natasha15@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Candice',
      lastName: 'Diaz',
      email: [
        {
          email: 'candice.diaz@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'candice59@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Pamela',
      lastName: 'Olson',
      email: [
        {
          email: 'pamela.olson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'pamela28@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Kimberly',
      lastName: 'Adams',
      email: [
        {
          email: 'kimberly.adams@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kimberly71@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Jesus',
      lastName: 'Allen',
      email: [
        {
          email: 'jesus.allen@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jesus9@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Anne',
      lastName: 'Williams',
      email: [
        {
          email: 'anne.williams@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'anne89@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Jason',
      lastName: 'Dennis',
      email: [
        {
          email: 'jason.dennis@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jason59@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Paul',
      lastName: 'Tucker',
      email: [
        {
          email: 'paul.tucker@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'paul28@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Timothy',
      lastName: 'Ferguson',
      email: [
        {
          email: 'timothy.ferguson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'timothy44@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Crystal',
      lastName: 'Morales',
      email: [
        {
          email: 'crystal.morales@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'crystal48@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Sharon',
      lastName: 'Jones',
      email: [
        {
          email: 'sharon.jones@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'sharon35@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Joel',
      lastName: 'Cabrera',
      email: [
        {
          email: 'joel.cabrera@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joel87@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Lori',
      lastName: 'Greer',
      email: [
        {
          email: 'lori.greer@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'lori72@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Scott',
      lastName: 'Tyler',
      email: [
        {
          email: 'scott.tyler@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'scott93@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Brittany',
      lastName: 'Harmon',
      email: [
        {
          email: 'brittany.harmon@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brittany44@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Melanie',
      lastName: 'Barber',
      email: [
        {
          email: 'melanie.barber@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'melanie81@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Joanna',
      lastName: 'May',
      email: [
        {
          email: 'joanna.may@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joanna33@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Laura',
      lastName: 'Wells',
      email: [
        {
          email: 'laura.wells@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'laura18@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Lisa',
      lastName: 'Wood',
      email: [
        {
          email: 'lisa.wood@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'lisa34@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Stephen',
      lastName: 'Edwards',
      email: [
        {
          email: 'stephen.edwards@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'stephen3@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Richard',
      lastName: 'Burns',
      email: [
        {
          email: 'richard.burns@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'richard24@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Valerie',
      lastName: 'White',
      email: [
        {
          email: 'valerie.white@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'valerie74@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Justin',
      lastName: 'Ortega',
      email: [
        {
          email: 'justin.ortega@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'justin91@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Thomas',
      lastName: 'White',
      email: [
        {
          email: 'thomas.white@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'thomas53@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Victoria',
      lastName: 'Cross',
      email: [
        {
          email: 'victoria.cross@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'victoria56@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Reginald',
      lastName: 'Trevino',
      email: [
        {
          email: 'reginald.trevino@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'reginald38@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Scott',
      lastName: 'Bailey',
      email: [
        {
          email: 'scott.bailey@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'scott66@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Rhonda',
      lastName: 'Lane',
      email: [
        {
          email: 'rhonda.lane@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'rhonda6@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Brent',
      lastName: 'Compton',
      email: [
        {
          email: 'brent.compton@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'brent3@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Elizabeth',
      lastName: 'Reeves',
      email: [
        {
          email: 'elizabeth.reeves@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'elizabeth94@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Kimberly',
      lastName: 'Riddle',
      email: [
        {
          email: 'kimberly.riddle@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kimberly32@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Katelyn',
      lastName: 'Larson',
      email: [
        {
          email: 'katelyn.larson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'katelyn88@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Carolyn',
      lastName: 'Williams',
      email: [
        {
          email: 'carolyn.williams@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'carolyn35@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Cindy',
      lastName: 'Burns',
      email: [
        {
          email: 'cindy.burns@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'cindy57@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Brooke',
      lastName: 'Rojas',
      email: [
        {
          email: 'brooke.rojas@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'brooke2@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Willie',
      lastName: 'Chapman',
      email: [
        {
          email: 'willie.chapman@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'willie27@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Theresa',
      lastName: 'Cooper',
      email: [
        {
          email: 'theresa.cooper@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'theresa60@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Suzanne',
      lastName: 'Nolan',
      email: [
        {
          email: 'suzanne.nolan@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'suzanne64@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Kyle',
      lastName: 'Evans',
      email: [
        {
          email: 'kyle.evans@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'kyle19@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'David',
      lastName: 'Ross',
      email: [
        {
          email: 'david.ross@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'david85@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Tyler',
      lastName: 'Velazquez',
      email: [
        {
          email: 'tyler.velazquez@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'tyler14@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Scott',
      lastName: 'Ferguson',
      email: [
        {
          email: 'scott.ferguson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'scott50@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Samuel',
      lastName: 'Baird',
      email: [
        {
          email: 'samuel.baird@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'samuel96@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Walker',
      email: [
        {
          email: 'amanda.walker@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'amanda67@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'William',
      lastName: 'Phillips',
      email: [
        {
          email: 'william.phillips@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'william12@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Matthew',
      lastName: 'Burch',
      email: [
        {
          email: 'matthew.burch@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'matthew64@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Tina',
      lastName: 'Chan',
      email: [
        {
          email: 'tina.chan@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'tina5@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Mark',
      lastName: 'Wilson',
      email: [
        {
          email: 'mark.wilson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'mark31@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jeff',
      lastName: 'Coleman',
      email: [
        {
          email: 'jeff.coleman@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jeff3@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Cody',
      lastName: 'Orozco',
      email: [
        {
          email: 'cody.orozco@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'cody89@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Nathan',
      lastName: 'Hoover',
      email: [
        {
          email: 'nathan.hoover@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'nathan10@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jennifer',
      lastName: 'Watson',
      email: [
        {
          email: 'jennifer.watson@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jennifer93@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Rachel',
      lastName: 'Howard',
      email: [
        {
          email: 'rachel.howard@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'rachel15@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Jason',
      lastName: 'Smith',
      email: [
        {
          email: 'jason.smith@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'jason84@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Craig',
      lastName: 'Peterson',
      email: [
        {
          email: 'craig.peterson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'craig42@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Paige',
      lastName: 'Le',
      email: [
        {
          email: 'paige.le@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'paige97@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'John',
      lastName: 'Castaneda',
      email: [
        {
          email: 'john.castaneda@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'john89@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Deanna',
      lastName: 'Dickerson',
      email: [
        {
          email: 'deanna.dickerson@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'deanna73@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Kim',
      lastName: 'Bridges',
      email: [
        {
          email: 'kim.bridges@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'kim90@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Brent',
      lastName: 'Jenkins',
      email: [
        {
          email: 'brent.jenkins@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'brent99@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Alexis',
      lastName: 'Thomas',
      email: [
        {
          email: 'alexis.thomas@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'alexis60@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Elizabeth',
      lastName: 'Beck',
      email: [
        {
          email: 'elizabeth.beck@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'elizabeth26@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Anne',
      lastName: 'Clark',
      email: [
        {
          email: 'anne.clark@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'anne71@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'guide',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Steven',
      lastName: 'Thomas',
      email: [
        {
          email: 'steven.thomas@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'steven94@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'user',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Jennifer',
      lastName: 'Ray',
      email: [
        {
          email: 'jennifer.ray@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'jennifer14@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Anna',
      lastName: 'Lewis',
      email: [
        {
          email: 'anna.lewis@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'anna1@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Tara',
      lastName: 'Freeman',
      email: [
        {
          email: 'tara.freeman@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'tara86@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Joseph',
      lastName: 'Porter',
      email: [
        {
          email: 'joseph.porter@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'joseph65@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Rachel',
      lastName: 'Hines',
      email: [
        {
          email: 'rachel.hines@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'rachel63@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Christopher',
      lastName: 'Nguyen',
      email: [
        {
          email: 'christopher.nguyen@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'christopher5@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Matthew',
      lastName: 'Wright',
      email: [
        {
          email: 'matthew.wright@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'matthew34@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'agent',
      status: 'pending',
    },
    {
      _id: uuidv4(),
      firstName: 'Amanda',
      lastName: 'Buchanan',
      email: [
        {
          email: 'amanda.buchanan@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'amanda36@example.net',
          isPrimary: false,
          isVerified: false,
        },
      ],
      role: 'partner',
      status: 'inactive',
    },
    {
      _id: uuidv4(),
      firstName: 'Morgan',
      lastName: 'West',
      email: [
        {
          email: 'morgan.west@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'morgan16@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Lindsey',
      lastName: 'Mccoy',
      email: [
        {
          email: 'lindsey.mccoy@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'lindsey95@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Isabel',
      lastName: 'Lamb',
      email: [
        {
          email: 'isabel.lamb@example.com',
          isPrimary: true,
          isVerified: true,
        },
        {
          email: 'isabel58@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Adam',
      lastName: 'Hernandez',
      email: [
        {
          email: 'adam.hernandez@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'adam6@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'agent',
      status: 'active',
    },
    {
      _id: uuidv4(),
      firstName: 'Maureen',
      lastName: 'Smith',
      email: [
        {
          email: 'maureen.smith@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'maureen40@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'user',
      status: 'suspended',
    },
    {
      _id: uuidv4(),
      firstName: 'Samantha',
      lastName: 'Frost',
      email: [
        {
          email: 'samantha.frost@example.com',
          isPrimary: true,
          isVerified: false,
        },
        {
          email: 'samantha63@example.net',
          isPrimary: false,
          isVerified: true,
        },
      ],
      role: 'partner',
      status: 'pending',
    },
  ],
};

export const fetchRandomUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomUsers); // Simulating API response
    }, 200); // Simulated 2 ms delay
  });
};

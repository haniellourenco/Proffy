const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    //Inserir dados

    proffyValue = { 
        name: "Haniel Lourenço", 
        avatar: "https://scontent.fcfc2-1.fna.fbcdn.net/v/t1.0-9/72295119_2467073236710179_4117636003382951936_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=oKurvOq3VScAX9g4fCB&_nc_ht=scontent.fcfc2-1.fna&oh=6ab85437fb06f82743e27b01fea3869d&oe=5F537E24", 
        whatsapp: "47988212410",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        
    }

    classValue = {
        subject: 1, 
        cost: "10", 
        //o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday:1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday:0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //createProffy(db)
   //await  createProffy(db, {proffyValue, classValue, classScheduleValues})
    //Consultar os dados inseridos
    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")

    //consultar as classes de um determinado professor
    //e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    console.log(selectedClassesAndProffys)

    //o horario que a pessoa trabalha, por exemplo, eh das 8h - 18h
    //o horario do time_from (8h) precisa ser menor ou igual ao horario solicitado
    //o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)
})
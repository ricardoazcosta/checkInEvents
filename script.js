

 
let participants = [
    {
        nome: "Ricardo A. Costa",
        email: "ricardozanete@gmail.com",
        dataInscricao: new Date(2024, 5, 22, 19, 20),
        dataCheckIn: new Date(2024, 5, 25, 22, 0)
    },
    {
        nome: "Juliana Martins",
        email: "julimartins@example.com",
        dataInscricao: new Date(2024, 5, 23, 10, 15),
        dataCheckIn: new Date(2024, 5, 25, 10, 30)
    },
    {
        nome: "Marcos de Souza",
        email: "marcosds@example.com",
        dataInscricao: new Date(2024, 5, 22, 14, 35),
        dataCheckIn: new Date(2024, 5, 25, 14, 50)
    },
    {
        nome: "Sofia Cardoso",
        email: "sofiacard@example.com",
        dataInscricao: new Date(2024, 5, 23, 16, 0),
        dataCheckIn: new Date(2024, 5, 25, 16, 20)
    },
    {
        nome: "Luiz Fernando",
        email: "luizfern@example.com",
        dataInscricao: new Date(2024, 5, 24, 9, 10),
        dataCheckIn: new Date(2024, 5, 25, 9, 30)
    },
    {
        nome: "Ana Paula Rodrigues",
        email: "anapaula@example.com",
        dataInscricao: new Date(2024, 5, 23, 11, 45),
        dataCheckIn: new Date(2024, 5, 25, 12, 5)
    },
    {
        nome: "Carlos Magno",
        email: "carlosmag@example.com",
        dataInscricao: new Date(2024, 5, 24, 15, 30),
        dataCheckIn: new Date(2024, 5, 25, 15, 45)
    },
    {
        nome: "Tereza Cristina",
        email: "terezacris@example.com",
        dataInscricao: new Date(2024, 5, 24, 18, 25),
        dataCheckIn: new Date(2024, 5, 25, 18, 40)
    },
    {
        nome: "Felipe Moraes",
        email: "felipemoraes@example.com",
        dataInscricao: new Date(2024, 5, 25, 7, 55),
        dataCheckIn: new Date(2024, 5, 25, 8, 10)
    },
    {
        nome: "Isabela Freitas",
        email: "isabelafreitas@example.com",
        dataInscricao: new Date(2024, 5, 24, 12, 0),
        dataCheckIn: new Date(2024, 5, 25, 12, 15)
    }
];



const createNewParticipant = (participant) => {
    const dataInscricao = dayjs(Date.now()).to(participant.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participant.dataCheckIn)

    if (participant.dataCheckIn == null) {
        dataCheckIn = `
        <button 
        data-email="${participant.email}"
        onclick= "checkIn(event)" >
        Comfirmar check-in
        </button>
        `
        
    }
    return `
    <tr>
                <td>
                    <strong>
                        ${participant.nome}
                    </strong>
                    <br>
                    <small>
                        ${participant.email}
                        
                    </small>
                </td>
                <td>${dataInscricao}</td>
                <td>${dataCheckIn}</td>
            </tr>
    `
}

const updateList = (participants) => {
    let output = ''

    for(let participant of participants){
        output += createNewParticipant(participant);

    }
    document.querySelector('tbody')
    .innerHTML = output
}

updateList(participants)

const addParticipant = (event) => {
    event.preventDefault()
    const dataForm = new FormData(event.target)

    const participant = {
        nome: dataForm.get('nome'),
        email: dataForm.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    //verificação se o participante já existe
    const participantExist = participants.find((p) => {
        return p.email == participant.email
    })

    if(participantExist) {
       
        Toastify({
            text: "E-mail já cadastrado !!!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #ff3d00, #cc4d66, #ff3d00)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
          
          return;
    }else {
        // Se o participante não existe, cadastra o participante e exibe a mensagem de sucesso
        // **Adicione o código de cadastro do participante aqui**
      
        Toastify({
          text: "Participante cadastrado com sucesso!",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #eec146, #fab243, #eec146)",
          },
          onClick: function(){} // Callback after click
        }).showToast();
      }

    participants = [participant, ...participants]
    updateList(participants)

    //limpasr formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const checkIn = (event) => {
const mensageConfirme = 'Tem certeza que deseja fazer o check-in?'

if(confirm(mensageConfirme) == false){
    return
}

    const participant = participants.find((p) =>{
        return p.email == event.target.dataset.email
    })
    participant.dataCheckIn = new Date()
    updateLista(participants)
    }
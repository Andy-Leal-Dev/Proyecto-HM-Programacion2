

const radioAntecFamily = document.querySelectorAll('#input-Antec_Per');
const selectedAntcFamily = [];
let AntecFamily = "";


radioAntecFamily.forEach(radioButton => {
  radioButton.addEventListener('change', function() {
    if (this.checked) {
      selectedAntcFamily.push(this.value);
    } else {
      
      const index = selectedAntcFamily.indexOf(this.value);
      if (index !== -1) {
        selectedAntcFamily.splice(index, 1);
      }
    }
  });
});

const radioAntecPerso = document.querySelectorAll('#input-antec');
const selectedAntcPerso = [];
let AntecPerso = "";

radioAntecPerso.forEach(radioButton => {
  radioButton.addEventListener('change', function() {
    if (this.checked) {
      selectedAntcPerso.push(this.value);
    } else {
      
      const index = selectedAntcPerso.indexOf(this.value);
      if (index !== -1) {
        selectedAntcPerso.splice(index, 1);
      }
    }
  });
});

const radioAntecPedi = document.querySelectorAll('#input-Antec_Neo');
const selectedAntcPedi = [];
let AntecPedi = "";

radioAntecPedi.forEach(radioButton => {
  radioButton.addEventListener('change', function() {
    if (this.checked) {
      selectedAntcPedi.push(this.value);
    } else {

      const index = selectedAntcPedi.indexOf(this.value);
      if (index !== -1) {
        selectedAntcPedi.splice(index, 1);
      }
    }
  });
});

/********************************************************************
---------------------------VALIDACIONES-----------------------------
********************************************************************/
let s=0; j=0;
let Wname=false, WnamePed=false, Wlast=false, WlastPed=false, WDNI= false,WDNIPed=false; 
let Wedad1=false, WedadPed1= false, WedadPed2= false, Wtel=false, WtelPa=false, Wemer=false, WParen=false;
let WOcup =false, Wedad2=false;
const WarName = document.querySelector('.Wname');
const WarNamePed = document.querySelector('.WnamePed');
const Warlast = document.querySelector('.Wlast');
const WarlastPed = document.querySelector('.WlastPed');
const WarDNI = document.querySelector('.WDNI');
const WarDNIPed = document.querySelector('.WDNIPed');
const WarEdad = document.querySelector('.Wedad');
const WarEdadPed = document.querySelector('.WedadPed');
const Wartel = document.querySelector('.Wtel');
const WartelPa = document.querySelector('.WtelPeren');
const Waremer = document.querySelector('.Wemer');
const WarOcup = document.querySelector('.WOcup');
const WarParen = document.querySelector('.WParen');

const tipoValidacion = document.querySelector('.form-datos').dataset.tipo;
const Form = document.querySelector('.btn-registro');
const inputs = document.querySelectorAll('.form-datos input');
const WarRegistro = document.querySelector('.WarRePacientes');


const expresiones ={
  nombre: /^[a-zA-ZÄ-ÿ\s]{2,40}$/,
  usuario:/^[a-zA-Z0-9]{4,16}$/,
  contras:/^[a-zA-Z0-9\_\-]{4,12}$/,
  number:/[0-9]{1,30}$/,
  text:/^[a-zA-ZÄ-ÿ\s]{0,60}$/,
  tel: /[0-9]{7,30}$/
}

const CamposPaciente = {
  nombrePaciente: false,
  lastnamePaciente: false,
  DNIPaciente: false,
  edadPaciente: false,
  telefonopaciente: false,
  emergencia:false,
  parentesco:false,
  telParentes:false,
  Ocupacion:false

}

const CamposPediatrico = {
  nombrePediatrico: false,
  lastnamePediatrico: false,
  DNIPediatrico: false,
  edadPediatrico: false,
  nombreRepre: false,
  lasnameRepre: false,
  DNIPaciente: false,
  edadPaciente: false,
  telefonoRepre:false,
  parentesco:false,
  Ocupacion:false

}

function Entero(a){
  b = a - Math.floor(a);
  return b===0;
}


if(tipoValidacion==1){

      
  validarFormPAciente = (e)=>{
    switch(e.target.name){
        
      //Validadcion Nombre
      case "nameAd":
        
        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#name").style.border = "1px solid red";
          CamposPaciente.nombrePaciente=false;
          if (Wname==false) {
            WarName.textContent='Rellene el campo y no utilice numeros';
            Wname=true;
          }
        }else{
          document.querySelector("#name").style.border = "1px solid rgb(47, 105, 153)";
          CamposPaciente.nombrePaciente=true;
          WarName.textContent="";
          Wname=false
        }
        break;
       
        //Validacion Apellido
      case "lastnameAd":

        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#lastName").style.border = "1px solid red";
          CamposPaciente.lastnamePaciente=false;
          if (Wlast==false) {
            Warlast.textContent="Rellene el campo y no utilice numeros";
            Wlast=true;
          }
        }else{
          document.querySelector("#lastName").style.border = "1px solid rgb(47, 105, 153)";
          CamposPaciente.lastnamePaciente=true;
          Warlast.textContent="";
          Wlast=false;
        }
        break;
        
        //Validacion DNI
      case "DNIAd":
          if (Entero(e.target.value)==true) {
            if (expresiones.number.test(e.target.value)==false) {
              document.querySelector("#DNI").style.border = "1px solid red";
              CamposPaciente.DNIPaciente=false;
              if (WDNI==false) {
                WarDNI.textContent='Ingrese solo numeros';
                WDNI=true;
              }
            }else{
              document.querySelector("#DNI").style.border = "1px solid rgb(47, 105, 153)";
              CamposPaciente.DNIPaciente=true;
              WarDNI.textContent='';
              WDNI=false;
            }
          } else {
            document.querySelector("#DNI").style.border = "1px solid red";
            CamposPaciente.DNIPaciente=true;
            e.target.value = Math.floor(e.target.value);
            WarDNI.textContent='';
            WDNI=false;
          }
        
        break;
      
        //Validacion de Edad
      case "EdadAd":
        if (Entero(e.target.value)==true) {
          if (expresiones.number.test(e.target.value)==false) {
            document.querySelector("#Edad").style.border = "1px solid red";
            CamposPaciente.edadPaciente=false;
            if (Wedad1==false) {
              WarEdad.textContent='Ingrese solo numeros';
              Wedad1=true;
              Wedad2=false;
              Wedad3=false
            }
          }else{
            if (e.target.value.length > 3 || e.target.value>125) {
              e.target.value =  130;
              CamposPaciente.edadPaciente=true;
              document.querySelector("#Edad").style.border = "1px solid rgb(47, 105, 153)";
            }

            if(e.target.value<14){
              document.querySelector("#Edad").style.border = "1px solid red";
              CamposPaciente.edadPaciente=false;
              if (Wedad2==false) {
                WarEdad.textContent='Edad mayor a 15';
                Wedad2=true;
                Wedad1=false;
              }
            }else{
              CamposPaciente.edadPaciente=true;
              document.querySelector("#Edad").style.border = "1px solid rgb(47, 105, 153)";
              WarEdad.textContent='';
              Wedad2=false;
              Wedad1=false;
            }
          }
        }else {
          document.querySelector("#Edad").style.border = "1px solid red";
          CamposPaciente.DNIPaciente=true;
          e.target.value = Math.floor(e.target.value);
          Wedad2=false;
          Wedad1=false;
          
        }
      
        break;
        //VAlidacion de ocupacion
      case "Ocup":
        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#ocupacion").style.border = "1px solid red";
          CamposPaciente.Ocupacion = false;
          if (WOcup==false) {
            WarOcup.textContent='Rellene el campo y no utilice numeros';
            WOcup=true;
          }
        }else{
          document.querySelector("#ocupacion").style.border = "1px solid rgb(47, 105, 153)";
          CamposPaciente.Ocupacion = true;
          WarOcup.textContent='';
          WOcup=true;
          console.log('pasa');
        }
        break;

        //Validacion de telefono
      case "TelAd":
        if (expresiones.tel.test(e.target.value)==false) {
          document.querySelector("#tel").style.border = "1px solid red";
          CamposPaciente.telefonopaciente = false;
          if (Wtel==false) {
            Wartel.textContent='Rellene el campo y no utilice letras';
            Wtel=true;
          }
          
        }else{
          document.querySelector("#tel").style.border = "1px solid rgb(47, 105, 153)";
          CamposPaciente.telefonopaciente = true;
          Wartel.textContent='';
          Wtel=false;
        }
        break;
        //Validacionde En caso de emergenci
      case 'Emerg':

        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#emergencia").style.border = "1px solid red";
          CamposPaciente.emergencia=false;
          if (Wtel==false) {
            Waremer.textContent='Rellene el campo y no utilice numeros';
            Wemer=true;
          }
        }else{
          document.querySelector("#emergencia").style.border = "1px solid rgb(47, 105, 153)";
          CamposPaciente.emergencia=true;
          Waremer.textContent='';
          Wemer=true;
        }
        break;
        //Validacion de Pariente
      case 'Paren':
        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#parentesco").style.border = "1px solid red";
          CamposPaciente.parentesco=false;
          if (WParen==false) {
            WarParen.textContent='Rellene el campo y no utilice numeros';
            WParen=true;
          }
        }else{
          document.querySelector("#parentesco").style.border = "1px solid rgb(47, 105, 153)";
          CamposPaciente.parentesco=true;
          WarParen.textContent='';
          WParen=false;
        }
        break;

        case "TelPar":
          if (expresiones.tel.test(e.target.value)==false) {
            document.querySelector("#tel-parentesco").style.border = "1px solid red";
            CamposPaciente.telParentes = false;
            if (WtelPa==false) {
              WartelPa.textContent='Rellene el campo y no utilice letras';
              WtelPa=true;
            }
            
          }else{
            document.querySelector("#tel").style.border = "1px solid rgb(47, 105, 153)";
            CamposPaciente.telParentes = true;
            WartelPa.textContent='';
            WtelPa=false;
          }
          break;

  }

}

//fin de IF
}else{

  validarFormPediatrico = (e)=>{
    switch(e.target.name){
        //Validacion nombre pediatrico
      case "namePed":
        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#namePed").style.border = "1px solid red";
          CamposPediatrico.nombrePediatrico=false;
          if (WnamePed==false) {
            WarNamePed.textContent='Rellene el campo y no utilice numeros';
            WnamePed=true;
          }
        }else{
          document.querySelector("#namePed").style.border = "1px solid rgb(47, 105, 153)";
          CamposPediatrico.nombrePediatrico=true;
          WarNamePed.textContent='';
          WnamePed=false;
        }
        break;
      
        //Validacion Apellido pedriatico
      case "lastNamePed":
        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#lastPed").style.border = "1px solid red";
          CamposPediatrico.lastnamePediatrico=false;
          if (WlastPed==false) {
            WarlastPed.textContent='Rellene el campo y no utilice numeros';
            WlastPed=true;
          }
        }else{
          document.querySelector("#lastPed").style.border = "1px solid rgb(47, 105, 153)";
          CamposPediatrico.lastnamePediatrico=true;
          WarlastPed.textContent='';
          WlastPed=false;
        }
        break;
        
        //Validacion DNI pedriatico
      case "DNIPed":
        if (Entero(e.target.value)==true) {
          if (expresiones.number.test(e.target.value)==false) {
            document.querySelector("#DNIPed").style.border = "1px solid red";
            CamposPediatrico.DNIPediatrico=false;
            if (WDNI==false) {
              WarDNI.textContent='Ingrese solo numeros';
              WDNI=true;
            }
          }else{
            document.querySelector("#DNIPed").style.border = "1px solid rgb(47, 105, 153)";
            CamposPediatrico.DNIPediatrico=true;
            WarDNI.textContent='';
            WDNI=false;
          }
        } else {
          document.querySelector("#DNIPed").style.border = "1px solid red";
          CamposPediatrico.DNIPediatrico=true;
          e.target.value = Math.floor(e.target.value);
          WarDNI.textContent='';
          WDNI=false;
        }
        
        break;
      //Validacion Edad Pedriatico
      case "edadPed":
        if (Entero(e.target.value)==true) {
          if (expresiones.number.test(e.target.value)==false) {
            document.querySelector("EdadPed").style.border = "1px solid red";
            CamposPediatrico.edadPediatrico=false;
            if (WedadPed1==false) {
              WarEdad.textContent='Rellene el campo';
              WedadPed1=true;
              WedadPed2=false;
              WedadPed3=false
            }
          }else{
            if (e.target.value.length > 3 || e.target.value>17) {
              e.target.value =  15;
              CamposPediatrico.edadPediatrico=true;
              document.querySelector("#EdadPed").style.border = "1px solid rgb(47, 105, 153)";
            }else{
              CamposPediatrico.edadPediatrico=true;
              document.querySelector("#EdadPed").style.border = "1px solid rgb(47, 105, 153)";
              WarEdad.textContent='';
              Wedad2=false;
              Wedad1=false;
              Wedad3=false;
            }
          }
        }else {
          document.querySelector("#EdadPed").style.border = "1px solid red";
          CamposPediatrico.edadPediatrico=true;
          e.target.value = Math.floor(e.target.value);
        }
      
        break;
        //Validacion telefono representante
      case "TelAd":
          if (expresiones.tel.test(e.target.value)==false) {
            document.querySelector("#tel").style.border = "1px solid red";
            CamposPediatrico.telefonoRepre=false;
            if (Wtel==false) {
              Wartel.textContent='Rellene el campo y no utilice letras';
              Wtel=true;
            }
          }else{
            document.querySelector("#tel").style.border = "1px solid rgb(47, 105, 153)";
            CamposPediatrico.telefonoRepre=true;
            Wartel.textContent='';
            Wtel=false;
          }
          break;
   
        //Validadcion Nombre
      case "nameAd":
        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#name").style.border = "1px solid red";
          CamposPediatrico.nombreRepre=false;
          if (Wname==false) {
            WarName.textContent='Rellene el campo y no utilice numeros';
            Wname=true;
          }
        }else{
          document.querySelector("#name").style.border = "1px solid rgb(47, 105, 153)";
          CamposPediatrico.nombreRepre=true;
          WarName.textContent="";
          Wname=false
        }
        break;

        //Validacion Apellido
      case "lastnameAd":
        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#lastName").style.border = "1px solid red";
          CamposPediatrico.lasnameRepre=false;
          if (Wlast==false) {
            Warlast.textContent="Rellene el campo y no utilice numeros";
            Wlast=true;
          }
        }else{
          document.querySelector("#lastName").style.border = "1px solid rgb(47, 105, 153)";
          CamposPediatrico.lasnameRepre=true;
          Warlast.textContent="";
          Wlast=false;
        }
        break;
        
        //Validacion DNI
      case "DNIAd":
        if (Entero(e.target.value)==true) {
          if (expresiones.number.test(e.target.value)==false) {
            document.querySelector("#DNI").style.border = "1px solid red";
            CamposPediatrico.DNIPaciente=false;
            if (WDNI==false) {
              WarDNI.textContent='Ingrese solo numeros';
              WDNI=true;
            }
          }else{
            document.querySelector("#DNI").style.border = "1px solid rgb(47, 105, 153)";
            CamposPediatrico.DNIPaciente=true;
            WarDNI.textContent='';
            WDNI=false;
          }
        } else {
          document.querySelector("#DNI").style.border = "1px solid red";
          CamposPediatrico.DNIPaciente=true;
          e.target.value = Math.floor(e.target.value);
          WarDNI.textContent='';
          WDNI=false;
        }
        break;
        //validacion de la edad
      case "EdadAd":
        if (Entero(e.target.value)==true) {
          if (expresiones.number.test(e.target.value)==false) {
            document.querySelector("#Edad").style.border = "1px solid red";
            CamposPediatrico.edadPaciente=false;
            if (Wedad1==false) {
              WarEdad.textContent='Ingrese solo numeros';
              Wedad1=true;
              Wedad2=false;
              Wedad3=false
            }
          }else{
            if (e.target.value.length > 3 || e.target.value>125) {
              e.target.value =  130;
              CamposPediatrico.edadPaciente=true;
              document.querySelector("#Edad").style.border = "1px solid rgb(47, 105, 153)";
            }

            if(e.target.value<17){
              document.querySelector("#Edad").style.border = "1px solid red";
              CamposPediatrico.edadPaciente=false;
              if (Wedad2==false) {
                WarEdad.textContent='Edad mayor a 18';
                Wedad2=true;
                Wedad1=false;
              }
            }else{
              CamposPediatrico.edadPaciente=true;
              document.querySelector("#Edad").style.border = "1px solid rgb(47, 105, 153)";
              WarEdad.textContent='';
              Wedad2=false;
              Wedad1=false;
            }
          }
        }else {
          document.querySelector("#Edad").style.border = "1px solid red";
          CamposPediatrico.DNIPaciente=true;
          e.target.value = Math.floor(e.target.value);
          Wedad2=false;
          Wedad1=false;
          
        }
        break;

        //Validacion pariente
      case 'Paren':
        if (expresiones.nombre.test(e.target.value)==false) {
          document.querySelector("#parentesco").style.border = "1px solid red";
          CamposPediatrico.parentesco=false;
          if (WParen==false) {
            WarParen.textContent='Rellene el campo y no utilice numeros';
            WParen=true;
          }
        }else{
          document.querySelector("#parentesco").style.border = "1px solid rgb(47, 105, 153)";
          CamposPediatrico.parentesco=true;
          WarParen.textContent='';
          WParen=false;
        }
        break;

      case 'Ocup':
      if (expresiones.nombre.test(e.target.value)==false) {
        document.querySelector('#ocupacion').style.border = "1px solid red";
        CamposPediatrico.Ocupacion=false;
        if (WOcup==false) {
          WarOcup.textContent='Rellene el campo y no utilice numeros';
          WOcup=true;
        }
      }else{
        document.querySelector('#ocupacion').style.border = "1px solid rgb(47, 105, 153)";
        CamposPediatrico.Ocupacion=true;
        WarOcup.textContent='';
        WOcup=false;

      }
      break;
    }
  }
}


inputs.forEach((input)=>{
  if (tipoValidacion==1) {
    input.addEventListener('keyup',validarFormPAciente);
    input.addEventListener('blur',validarFormPAciente);
  } else {
    input.addEventListener('keyup',validarFormPediatrico);
    input.addEventListener('blur',validarFormPediatrico);
  }
  
})


document.querySelector('.btn-registro').addEventListener('click', async () => {

  for (let i = 0; i < selectedAntcFamily.length; i++) {
    AntecFamily += selectedAntcFamily[i] + ', ';
  }

  for (let i = 0; i < selectedAntcPerso.length; i++) {
    AntecPerso += selectedAntcPerso[i] + ', ';
  }

  for (let i = 0; i < selectedAntcPedi.length; i++) {
    AntecPedi += selectedAntcPedi[i] + ', ';
  }  

  const tipoPaciente = document.querySelector('.form-datos').dataset.tipo;

  if(tipoPaciente== 1){

    if (CamposPaciente.nombrePaciente && CamposPaciente.lastnamePaciente && CamposPaciente.DNIPaciente && CamposPaciente.edadPaciente &&
      CamposPaciente.telefonopaciente && CamposPaciente.emergencia && CamposPaciente.parentesco &&
      CamposPaciente.telParentes && CamposPaciente.Ocupacion) {
      
      const NombresPaciente = document.querySelector('.name_Ad').value;
      const ApellidosPaciente = document.querySelector('.lastName_Ad').value;
      const CedulaPaciente = document.querySelector('.DNI_Ad').value;
      const EdadPaciente = document.querySelector('.Edad_Ad').value;
      const SexoPaciente = document.querySelector('.select-sexo_Ad').value;
      const TelefonoPaciente = document.querySelector('.tel_Ad').value;
      const OcupacionPaciente = document.querySelector('.ocup_Ad').value;
      const Direccion_CompletaPaciente = document.querySelector('.Direc_Ad').value;
      const Informacion_AdicionalPaciente = document.querySelector('.Info_Ad').value;
      const EmergenciaPaciente = document.querySelector('.emer_Ad').value;
      const ParentescoPaciente = document.querySelector('.Paren_Ad').value;
      const Telefono_ParentescoPaciente = document.querySelector('.tel-Ad').value;
      const Direccion_ParentescoPaciente = document.querySelector('.Dir_Paren_Ad').value;
    
      const data ={
        tipo:tipoPaciente,
        Nombres:NombresPaciente,
        Apellidos:ApellidosPaciente,
        Cedula:CedulaPaciente,
        Edad:EdadPaciente,
        Sexo:SexoPaciente,
        Telefono:TelefonoPaciente,
        Ocupacion:OcupacionPaciente,
        Direccion_Completa:Direccion_CompletaPaciente,
        Informacion_Adicional:Informacion_AdicionalPaciente,
        Emergencia:EmergenciaPaciente,
        Parentesco:ParentescoPaciente,
        Telefono_Parentesco:Telefono_ParentescoPaciente,
        Direccion_Parentesco:Direccion_ParentescoPaciente,
        Personales:AntecPerso, 
        Familires:AntecFamily, 
        
      }
    
      console.log(data);
    
      try {
        const response = await fetch('/api/newPaciente', { //Usando el fetch hago la peticion a la api para Iniciar sesion
            method: 'POST', //Medoto de envio de datos para obtener una respuesta
            body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
    
        if (response.ok) { //Si la peticion es exitosa
        window.location.href = '/Paciente'; //Me redigira a la pagina principal en este caso paciente
        } else {
        const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso de contraseña o usuario incorrecto
        Warnings.textContent += "Usuario o Contraseña Incorrecta";
        console.error('Error:', error);
    
        }
        } catch (error) {
          console.error('Error:', error)
        }

    } else {

      Form.addEventListener('click',(e)=>{
        e.preventDefault();
        
        if(j==0){
            WarRegistro.textContent ="Rellene el formulario adecuadamente";
            j+=1;
        } 
      })
    }

  }

  if (tipoPaciente==2) {

      if (CamposPediatrico.nombrePediatrico && CamposPediatrico.lastnamePediatrico && CamposPediatrico.DNIPediatrico &&
        CamposPediatrico.edadPediatrico && CamposPediatrico.nombreRepre && CamposPediatrico.lasnameRepre && CamposPediatrico.DNIPaciente && CamposPediatrico.edadPaciente &&
        CamposPediatrico.telefonoRepre &&  CamposPediatrico.parentesco && CamposPediatrico.Ocupacion) {
        
        const NombresPaciente = document.querySelector('.name_Ad').value;
        const ApellidosPaciente = document.querySelector('.lastName_Ad').value;
        const CedulaPaciente = document.querySelector('.DNI_Ad').value;
        const EdadPaciente = document.querySelector('.Edad_Ad').value;
        const SexoPaciente = document.querySelector('.select-sexo_Ad').value;
        const TelefonoPaciente = document.querySelector('.tel_Ad').value;
        const OcupacionPaciente = document.querySelector('.ocup_Ad').value;
        const ParentescoPaciente = document.querySelector('.Paren_Ad').value;
        const Direccion_ParentescoPaciente = document.querySelector('.Dir_Paren_Ad').value;
        const Pediatrico_NombresPaciente = document.querySelector('.name_Ped').value;
        const Pediatrico_ApellidosPaciente = document.querySelector('.last_Ped').value
        const Pediatrico_EdadPaciente = document.querySelector('.Edad_Ped').value;
        const Pediatrico_CedulaPaciente = document.querySelector('.DNI_Ped').value
        const Pediatrico_SexoPaciente = document.querySelector('.select-sexo_Ped').value
        
        const data ={
          tipo:tipoPaciente,
          Nombres:NombresPaciente,
          Apellidos:ApellidosPaciente,
          Cedula:CedulaPaciente,
          Edad:EdadPaciente,
          Sexo:SexoPaciente,
          Telefono:TelefonoPaciente,
          Ocupacion:OcupacionPaciente,
          Parentesco:ParentescoPaciente,
          Direccion_Parentesco:Direccion_ParentescoPaciente,
          Pediatrico_Nombres:Pediatrico_NombresPaciente,
          Pediatrico_Apellidos:Pediatrico_ApellidosPaciente,
          Pediatrico_Edad:Pediatrico_EdadPaciente,
          Pediatrico_Cedula:Pediatrico_CedulaPaciente,
          Pediatrico_Sexo:Pediatrico_SexoPaciente,
          Personales:AntecPerso, 
          Familires:AntecFamily, 
          Pediatricos:AntecPedi
        }

          console.log(data);


          try {
            const response = await fetch('/api/newPaciente', { //Usando el fetch hago la peticion a la api para Iniciar sesion
                method: 'POST', //Medoto de envio de datos para obtener una respuesta
                body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
        
            if (response.ok) { //Si la peticion es exitosa
            window.location.href = '/Paciente/1'; //Me redigira a la pagina principal en este caso paciente
            } else {
            const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso de contraseña o usuario incorrecto
            Warnings.textContent += "Usuario o Contraseña Incorrecta";
            console.error('Error:', error);
        
            }
          } catch (error) {
            console.error('Error:', error)
          }
            
      } else {
        Form.addEventListener('click',(e)=>{
          e.preventDefault();
          console.log(tipoPaciente, "Hola mudno");
          if(s==0){
              WarRegistro.textContent ="Rellene el formulario de forma adecuada";
              s+=1;
          } 
        })
      }
    
  }
  
  
});
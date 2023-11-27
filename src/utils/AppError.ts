export class AppError {
  message: string;

  constructor(message: string) { // Contrutor é executado no momento que a classe é instanciada de forma automatica, sem precisar passar nada. 
    this.message = message;   // Ele nós obrigado ao instanciar a classe a refinir os parametros, neste caso é "message"
  }
}
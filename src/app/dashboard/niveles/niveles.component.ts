import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent {

  public user!: User;

  constructor(  private userService: UserService){
    this.user = userService.user;

    this.loadLevels(this.user.cid!);
  }

  /** ======================================================================
   * USER SELETED
  ====================================================================== */
  public userSelected!: User;
  public ticketWhatsapp: string = '';

  selectUser(user: User){    
    this.userSelected = user;
    this.ticketWhatsapp = `Hola, ${this.userSelected.name} ${this.userSelected.lastname}. Un gusto saludarte\n`;
  }

  /** ================================================================
   *   ENVIAR WHATSAPP
  ==================================================================== */
  sendWhatsapp(msg: string){
    
    let text = msg.replaceAll(' ','+').replaceAll('\n' , '%0A');
    window.open(`whatsapp://send?text=${text}&phone=${this.userSelected.phone}`);
    
  }

  /** ======================================================================
   * LOAD LEVELS
  ====================================================================== */
  public first: User[] = [];
  public two: User[] = [];
  public three: User[] = [];
  public four: User[] = [];
  loadLevels(cid: string){

    this.first = [];
    this.two = [];
    this.three = [];
    this.four = [];

    if (cid.length > 0) {

      this.userService.loadLevelsUser(cid)
          .subscribe( ({first, two, three, four,}) => {

            this.first = first;
            this.two = two;
            this.three = three;
            this.four = four;

          }, (err) => {
            console.log(err);
            Swal.fire('Error', err.error.msg, 'error');            
          })
      
    }

  }

}

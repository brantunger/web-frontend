import {Component} from '@angular/core';
import {faFacebook, faGithub, faInstagram, faLinkedin, faTwitter, IconDefinition} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-bottom-footer',
  templateUrl: './bottom-footer.component.html',
  styleUrls: ['./bottom-footer.component.scss']
})
export class BottomFooterComponent {
  faFacebook: IconDefinition = faFacebook;
  faTwitter: IconDefinition = faTwitter;
  faInstagram: IconDefinition = faInstagram;
  faLinkedIn: IconDefinition = faLinkedin;
  faGithub: IconDefinition = faGithub;
}

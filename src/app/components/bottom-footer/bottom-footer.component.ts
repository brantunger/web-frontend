import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faFacebook, faGithub, faInstagram, faLinkedin, faTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { take } from 'rxjs';
import { CompanyInfo } from 'src/app/models/CompanyInfo';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-bottom-footer',
  templateUrl: './bottom-footer.component.html',
  styleUrls: ['./bottom-footer.component.scss']
})
export class BottomFooterComponent implements OnInit {
  faFacebook: IconDefinition = faFacebook;
  faTwitter: IconDefinition = faTwitter;
  faInstagram: IconDefinition = faInstagram;
  faLinkedIn: IconDefinition = faLinkedin;
  faGithub: IconDefinition = faGithub;
  companyInfo?: CompanyInfo;

  constructor(private webApiService: WebApiService) { }


  ngOnInit(): void {
    this.webApiService.getCompanyInfo()
      .pipe(take(1))
      .subscribe({
        next: (response: CompanyInfo) => this.companyInfo = response,
        error: (error: HttpErrorResponse) => console.error(error.error.error)
    });
  }
}

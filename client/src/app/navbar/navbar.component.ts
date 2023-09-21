import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ict-navbar',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isNavbarCollapsed = true;
}

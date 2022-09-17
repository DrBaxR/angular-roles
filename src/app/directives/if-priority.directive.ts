import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService, UserRole } from '../services/auth.service';

@Directive({
  selector: '[appIfPriority]'
})
export class IfPriorityDirective {

  @Input("appIfPriority") role: UserRole | undefined;

  hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private auth: AuthService,
  ) { 
    auth.user$.subscribe(user => {
      if (!user?.role) return;

      const hasPriority = this.role && this.auth.hasPriority(this.role, user.role);

      if (hasPriority && !this.hasView) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!hasPriority && this.hasView) {
        this.viewContainerRef.clear();
        this.hasView = false;
      }
    })
  }

}

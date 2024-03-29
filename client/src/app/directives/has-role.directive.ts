import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs/operators';
import { User } from '../models/user';

@Directive({
    selector: '[appHasRole]' // *appHasRole='["Admin"]'
})
export class HasRoleDirective implements OnInit
{
    @Input() appHasRole: string[];
    user: User;

    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private accountService: AccountService)
    {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user =>
        {
            this.user = user;
        })
    }

    ngOnInit(): void
    {
        //clear the view if no roles
        if (!this.user?.roles || this.user == null)
        {
            this.viewContainerRef.clear();
        }

        if (this.user?.roles.some(r => this.appHasRole.includes(r)))
        {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else
        {
            this.viewContainerRef.clear();
        }
    }

}

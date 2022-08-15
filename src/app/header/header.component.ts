import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    
    collapsed = true;
    isAuthenticated = false;
    private userSub: Subscription;

    constructor( 
        public authService: AuthService,
        private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        // this.userSub = this.authService.user.subscribe(user => {
        this.userSub = this.store.select('auth').pipe(map(authState => {return authState.user})).subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData() {
        // this.dataStorageService.fetchRecipes()
        //     .subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());    
    }

}
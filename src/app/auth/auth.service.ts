import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class AuthService{
    user: Observable<User>;
    uid: string;

    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore, 
        private router: Router){
            this.user = this.afAuth.authState.pipe(
                switchMap(user => {
                    if(user){
                        this.uid = user.uid;
                        return this.afs.doc<User>('users/' + user.uid).valueChanges();
                    } else{
                        return of(null);
                    }
                })
            )
        }    

    register(user: User, password: string){
        this.afAuth.createUserWithEmailAndPassword(user.email, password).then(
            res => {
                this.addUser(user, res.user.uid);
                this.router.navigate(['/home']);
            }, err => {
                console.log(err);
            }
        ).catch(err => {
            console.log(err);
        })
    }

    isLoggedIn(){
        if(this.afAuth.currentUser){
            return true;
        }
        return false;
    }

    login(email: string, password: string){
        return this.afAuth.signInWithEmailAndPassword(email, password)
    }

    async addUser(user: User, uid: string){
        user.uid = uid;
        await this.afs.doc('users/' + uid).set(user, {merge: true});
    }

    async updateCity(cities: string[]){
        await this.afs.doc('users/' + this.uid).update({
            cities: cities
        });
    }

    signOut(){
        return this.afAuth.signOut();
    }

    
}
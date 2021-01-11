package com.example.ReaderWorld.service;

import com.example.ReaderWorld.model.MyUserDetails;
import com.example.ReaderWorld.model.UserDTO;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService implements UserDetailsService {

    public static final String COL_NAME="User";


    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    PasswordEncoder encoder;


    public boolean saveUser(UserDTO user) throws InterruptedException, ExecutionException {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            UserDTO user_saved = new UserDTO();

            if (getUser(user.getEmail()) != null) {
                return false;
            }

            user_saved.setEmail(user.getEmail());
            user_saved.setPassword(encoder.encode(user.getPassword()));
            user_saved.setGivenName(user.getGivenName());
            user_saved.setFamilyName(user.getFamilyName());
            user_saved.setBirthDay(user.getBirthDay());

            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(user_saved.getEmail()).set(user_saved);
            return true;
        }
        catch (Exception e){
            throw new IllegalArgumentException("Error in the user.");
        }
    }

    public UserDTO getUser(String email) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(email);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        UserDTO user = null;
        if(document.exists()) {
            user = document.toObject(UserDTO.class);
            System.out.println("User with email  " + email);
            return user;
        } else {
            System.out.println("No User with email " + email);
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDTO user = null;
        try {
             user = getUser(email);
        } catch (InterruptedException | ExecutionException e) {
            System.out.println("--------------hapenedhere--------------------");
            e.printStackTrace();
        }
        if (user != null){
            return new MyUserDetails(user);
        }
        else{
            throw new UsernameNotFoundException("Kullanıcı bulunamadı,loadUserByUsername username=" + email);
        }
    }
}

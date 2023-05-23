package com.prueba.prueba.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.prueba.model.Usuario;
import com.prueba.prueba.persistence.UsuarioRepository;
import com.prueba.prueba.util.NotFoundException;

@RestController 
@RequestMapping("/preguntas")
@CrossOrigin(origins = "https://garatehegoi.github.io")
public class UsuarioController {
	@Autowired
	private UsuarioRepository usuarioDAO;
	
	//REST: get all (GET)
	@GetMapping("/usuario")
	public List<Usuario> findAllUsuarios(){
		return usuarioDAO.findAll();
	}		
	
	//REST: get usuarios by ID (GET)
	//@PathVariable: Annotation which indicates that a method parameter 
	//should be bound to a URI template variable.
	@GetMapping("/usuario/{id}")
	public ResponseEntity<Usuario> getUsuarioByID(@PathVariable int id) {
		//Es un Optional<T>
		Optional<Usuario> u = usuarioDAO.findById(id);
		//Si está presente lo devolvemos
		if(u.isPresent()){
		    return ResponseEntity.ok(u.get());
		}
		//Si no, lanzamos un error
		else{
		    throw new NotFoundException("Not found Usuario by id: " + id);
		}
	}
	
	//REST: Create new usuario (POST Method)
	//@RequestBody: Annotation indicating a method parameter 
	//should be bound to the body of the web request.
	@PostMapping("/usuario")
	public Usuario createUsuario(@RequestBody Usuario u) {
		return usuarioDAO.save(u);
	}	
	
	//REST: Update usuario (PUT)
	@PutMapping("/usuario/{id}")
	public ResponseEntity<Usuario> updateUsuario(@PathVariable int id, @RequestBody Usuario usuarioUpdateData){
		//En primer lugar, buscamos el Usuario
		Optional<Usuario> findUsuario = usuarioDAO.findById(id);
		//Si está presente lo devolvemos
		if(findUsuario.isPresent()){
			//Usuario encontrado para realizar update sobre él.
			Usuario usuarioToUpdate = findUsuario.get();			
			//Copiamos los nuevos datos al usuario
			usuarioToUpdate.copyDataFromUsuario(usuarioUpdateData);			
			//Guadramos en la DB
			Usuario usuarioSaved = usuarioDAO.save(usuarioToUpdate);			
		    return ResponseEntity.ok(usuarioSaved);
		}
		else {
			throw new NotFoundException("Not found Usuario by id: " + id);
		}
	}
	
	//REST: Delete Usuario (DELETE)
	@DeleteMapping("/usuario/{id}")
	public ResponseEntity<Boolean> deleteUsuario(@PathVariable int id) {
		//En primer lugar, buscamos el Usuario
		Optional<Usuario> findUsuario = usuarioDAO.findById(id);
		//Si está presente lo eliminamos
		if(findUsuario.isPresent()){	
			//Realizamos el Delete
			usuarioDAO.delete(findUsuario.get());			
		    return ResponseEntity.ok(true);
		}
		else {
			throw new NotFoundException("Not found Usuario by id: " + id);
		}
	}
}

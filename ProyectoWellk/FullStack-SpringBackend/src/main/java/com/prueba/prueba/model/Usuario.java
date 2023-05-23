package com.prueba.prueba.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {

	// Parameters
	@Id
	@Column(name = "id")
	private int id;

	@Column(name = "email")
	private String email;

	@Column(name = "edad")
	private int edad;

	@Column(name = "respuesta1")
	private String respuesta1;

	@Column(name = "respuesta2")
	private String respuesta2;

	@Column(name = "respuesta3")
	private String respuesta3;

	@Column(name = "respuesta4")
	private String respuesta4;

	@Column(name = "respuesta5")
	private String respuesta5;

	@Column(name = "respuesta6")
	private String respuesta6;

	// Constructor
	public Usuario() {
	}

	public Usuario(String email, int edad, String respuesta1, String respuesta2, String respuesta3, String respuesta4,
			String respuesta5, String respuesta6) {
		this.email = email;
		this.edad = edad;
		this.respuesta1 = respuesta1;
		this.respuesta2 = respuesta2;
		this.respuesta3 = respuesta3;
		this.respuesta4 = respuesta4;
		this.respuesta5 = respuesta5;
		this.respuesta6 = respuesta6;
	}

	// Methods
	public void copyDataFromUsuario(Usuario source) {
		this.email = source.getEmail();
		this.edad = source.getEdad();
		this.respuesta1 = source.getRespuesta1();
		this.respuesta2 = source.getRespuesta2();
		this.respuesta3 = source.getRespuesta3();
		this.respuesta4 = source.getRespuesta4();
		this.respuesta5 = source.getRespuesta5();
		this.respuesta6 = source.getRespuesta6();
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", email=" + email + ", edad=" + edad + ", respuesta1=" + respuesta1 + ", respuesta2="
				+ respuesta2 + ", respuesta3=" + respuesta3 + ", respuesta4=" + respuesta4 + ", respuesta5=" + respuesta5
				+ ", respuesta6=" + respuesta6;
	}
	

	// Getters Setters

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}

	public String getRespuesta1() {
		return respuesta1;
	}

	public void setRespuesta1(String respuesta1) {
		this.respuesta1 = respuesta1;
	}

	public String getRespuesta2() {
		return respuesta2;
	}

	public void setRespuesta2(String respuesta2) {
		this.respuesta2 = respuesta2;
	}

	public String getRespuesta3() {
		return respuesta3;
	}

	public void setRespuesta3(String respuesta3) {
		this.respuesta3 = respuesta3;
	}

	public String getRespuesta4() {
		return respuesta4;
	}

	public void setRespuesta4(String respuesta4) {
		this.respuesta4 = respuesta4;
	}

	public String getRespuesta5() {
		return respuesta5;
	}

	public void setRespuesta5(String respuesta5) {
		this.respuesta5 = respuesta5;
	}

	public String getRespuesta6() {
		return respuesta6;
	}

	public void setRespuesta6(String respuesta6) {
		this.respuesta6 = respuesta6;
	}

}

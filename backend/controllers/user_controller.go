package controllers

import (
	usecases "api/usecases/auth"
	"encoding/json"
	"net/http"
)

type UserController struct {
	SignUpInteractor                 *usecases.SignUpInteractor
	ConfirmSignUpInteractor          *usecases.ConfirmSignUpInteractor
	ResendConfirmationCodeInteractor *usecases.ResendConfirmationCodeInteractor
}

func (c *UserController) SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var input usecases.SignUpInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	output, err := c.SignUpInteractor.SignUp(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(output)
}

func (c *UserController) ConfirmSignUpHandler(w http.ResponseWriter, r *http.Request) {
	var input usecases.ConfirmSignUpInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	output, err := c.ConfirmSignUpInteractor.ConfirmSignUp(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}

func (c *UserController) ResendConfirmationCodeHandler(w http.ResponseWriter, r *http.Request) {
	var input usecases.ResendConfirmationCodeInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	output, err := c.ResendConfirmationCodeInteractor.ResendConfirmationCode(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}

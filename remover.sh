echo "REMOVER GRANZAP?"
echo "(sim/'qualquer coisa para cancelar')"
read teclado

if [ $teclado == sim ]; then
	sudo pm2 delete backend
	sudo pm2 delete frontend
	sudo pm2 save
	echo "Remoção Concluida"
	echo "Qualquer Reclamação so falar pelo github"
	echo "Tchau, :("
fi


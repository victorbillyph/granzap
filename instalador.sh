echo "Bem-vindo(a) ao Instalador do Granzap"

echo "Instalar? (se não rodar como sudo o script, precisara inserir senha)"

sudo echo "Root detectado, 1. Requisito alcançado"

sleep 3

clear

echo "Você tem nodejs altualizado?"
echo "(Sim/Não)"
read teclado
if [$teclado == "Sim"]; then
	echo "Pulando parte de instalar em 5 segundos"
	sleep 5
else
	sudo apt install nodejs npm
	echo "Tentativa de instalação feita"
fi
echo "Iniciando Parte 2..."
sleep 3
clear
sleep 3
echo "ALERTA: Esse instalador e compativel com vps com ubuntu 20.04 ou posterior"
sleep 3
echo "Carregando Arquivos"
sleep 2
echo "Detectando Pasta do usuario..."
echo "Usuario: $USER"
sleep 2

echo -e "\033[1;32mRequisitos minimos alcançados\033[0m e \033[0;31mPreparado para colocar aplicativo no sistema\033[0m"
sleep 5
echo 3
sleep 1
echo 2
sleep 1
echo 1
sleep 1
echo 0
sleep 1

clear
echo "A Partir de agora tudo e automatizado..."
sleep 5

 
cd $(pwd)

npm install
sudo npm install -g pm2
npm run build
pm2 start npm --name frontend -- run start
pm2 start npm --name backend -- run backend
pm2 save
pm2 startup
pm2 list
sleep 5
echo "INSTALAÇÃO FINALIZADA"
echo "Feito por Victorbillyph - Github"
echo "Original por Victorbillyph - Github"

sleep 5 
clear
echo "VICTORBILLYPH, FINALIZADO GRANZAP"

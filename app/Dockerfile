FROM nginx:1.15.0
ADD dist/ /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
CMD certbot --nginx
EXPOSE 443
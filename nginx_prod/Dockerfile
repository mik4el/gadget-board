FROM tutum/nginx
RUN rm /etc/nginx/sites-enabled/default
ADD sites-enabled/ /etc/nginx/sites-enabled

# Add pregenerated SSL certs from host, add certs to folder ssl
ADD ssl/m4bd_se.ssl-bundle.crt /etc/nginx/ssl/m4bd_se/m4bd_se.ssl-bundle.crt
ADD ssl/m4bd_se.key /etc/nginx/ssl/m4bd_se/m4bd_se.key
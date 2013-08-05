git add --all
git status
git commit -av
git push origin master
grunt build
cd ./dist
echo 'In gh-pages'
git add --all
git commit -am 'Updated Build push $(date)'
git push origin gh-pages --force
cd -
echo 'Deploy Success'
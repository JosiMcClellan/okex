task :dev do
  exec 'foreman start -p 3000 --procfile DevProcfile'
end

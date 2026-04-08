<?php

/**
 * Representação de 1 Registro do banco de dados
 * 
 * Em forma de CLASSE
 */
class Livro {

    public $id;

    public $titulo;

    public $autor;

    public $descricao;

    public $ano_de_lancamento;

    public $usuario_id;

    public $nota_avaliacao;

    public $count_avaliacoes;

    public function query($where, $params)
    {

        $database = new Database(config('database'));

        return $database->query(

            query: "
            
                select
        
                    l.id,
                    l.titulo,
                    l.autor,
                    l.descricao,
                    l.ano_de_lancamento,
                    round(sum(a.nota) / 5.0) as nota_avaliacao,
                    count(a.id) as count_avaliacoes
        
                from
        
                    livros l
        
                left join avaliacoes a on a.livro_id = l.id
        
                where $where
        
                group by
        
                    l.id,
                    l.titulo,
                    l.autor,
                    l.descricao,
                    l.ano_de_lancamento;
        
            ",
        
            class: self::class,
        
            params: $params
        
        ); 

    }

    public static function get($id)
    {

        return (new self)->query('l.id = :id', ['id' => $id])->fetch();

    }

    public static function all($filtro)
    {

        return (new self)->query('l.titulo like :filtro', ['filtro' => "%$filtro%"])->fetchAll();

    }

    public static function meus($usuario_id)
    {

        return (new self)->query('l.usuario_id = :usuario_id', ['usuario_id' => $usuario_id])->fetchAll();

    }

}
